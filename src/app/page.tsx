import Link from 'next/link';
import type { Metadata } from 'next';
import { PortableText } from '@portabletext/react';
import { client } from '../../sanity/lib/client';
import { homeCasesQuery, homePageQuery } from '../../sanity/lib/queries';
import JsonLd from '@/components/JsonLd';
import ContactForm from '@/components/ContactForm';
import MatchDiagram from '@/components/home/MatchDiagram';
import Script from 'next/script';
import VideoFrame from '@/components/home/VideoFrame';
import Icon from '@/components/Icon';
import { fallbackCases, withDefaults, type HomeCase, type HomeContent } from '@/lib/homeDefaults';

// Refresh from Sanity at most once a minute.
export const revalidate = 60;

async function getHome(): Promise<{ home: HomeContent; cases: HomeCase[] }> {
  let doc = null;
  let cases: HomeCase[] = [];
  try {
    [doc, cases] = await Promise.all([client.fetch(homePageQuery), client.fetch(homeCasesQuery)]);
  } catch {
    // Sanity unreachable or not configured: the built-in copy renders the whole page.
  }
  return { home: withDefaults(doc), cases: cases && cases.length ? cases : fallbackCases };
}

export async function generateMetadata(): Promise<Metadata> {
  const { home } = await getHome();
  return {
    title: { absolute: home.seoTitle },
    description: home.seoDescription,
    alternates: { canonical: '/' },
    openGraph: { title: home.seoTitle, description: home.seoDescription },
  };
}

const MATCH = '#match';

// The stressed words are wrapped in <strong>: the moment turns them to the accent.
function renderStatement(text: string, highlight?: string) {
  const at = highlight ? text.indexOf(highlight) : -1;
  if (!highlight || at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <strong>{highlight}</strong>
      {text.slice(at + highlight.length)}
    </>
  );
}

export default async function HomePage() {
  const { home, cases } = await getHome();

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'Free Lawyer Finder',
    url: 'https://freelawyerfinder.com',
    description: home.seoDescription,
    priceRange: 'Free',
  };
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: home.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: typeof f.answer === 'string' ? f.answer : f.answer.map((b: any) => (b.children || []).map((c: any) => c.text).join('')).join(' '),
      },
    })),
  };

  return (
    <>
      <JsonLd data={orgJsonLd} />
      <JsonLd data={faqJsonLd} />

      {/* Hero: split, the words on five columns, the matching diagram on six. */}
      <section aria-labelledby="hero-h" className="home-screen -mt-[var(--nav)] !pb-16" data-hero>
        <div className="wrap">
        <div className="hero-text grid gap-8 lg:h-[calc(100svh-var(--padt)-64px)] lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5">
            <p className="text-[14px] text-muted">{home.heroKicker}</p>
            <h1 id="hero-h" className="t-h1 mt-4">{home.heroHeadline}</h1>
            <p className="t-lead mt-6 max-w-[42ch]">{home.heroLead}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={MATCH} className="btn btn-primary w-full sm:w-auto">
                {home.primaryCtaLabel}
                <Icon name="arrow-right" size={16} />
              </a>
              <a href="#cases" className="btn btn-secondary w-full sm:w-auto">{home.secondaryCtaLabel}</a>
            </div>
          </div>
          <div className="sm:rounded-frame sm:bg-surface lg:col-span-6 lg:col-start-7">
            <MatchDiagram d={home.diagram} />
          </div>
        </div>
        </div>
      </section>

      {/* The statement, darkening word by word: the tasteskill word-highlight moment, loaded as is
          from public/taste/moments (MIT). Without script every word shows in full ink. */}
      <section
        aria-label={home.statementLabel}
        className="home-screen statement"
        data-moment="word-highlight"
        style={{
          ['--ink' as any]: '#181715',
          ['--bg' as any]: '#e8e8e3',
          ['--accent' as any]: '#5f5808',
          ['--display-weight' as any]: 400,
          ['--display-tracking' as any]: '-0.025em',
          ['--t-h2' as any]: 'clamp(38px, 1.6vw + 33px, 56px)',
        }}
      >
        <div className="wrap">
          <p className="t-label text-muted">{home.statementLabel}</p>
          <p className="mo-wh__text mt-4">{renderStatement(home.statementText, home.statementHighlight)}</p>
        </div>
      </section>
      <Script type="module" src="/taste/moments/moments.js" strategy="afterInteractive" />

      {/* Case types: rows from the Practice Area documents, beside the intro film. */}
      <section id="cases" aria-labelledby="cases-h" className="home-screen">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5">
            <h2 id="cases-h" className="t-h2">{home.casesHeading}</h2>
            <p className="mt-6 max-w-[56ch]">{home.casesIntro}</p>
            <ul className="mt-8">
              {cases.map((c, i) => {
                const inner = (
                  <>
                    <span className="font-medium">{c.title}</span>
                    <span className="col-start-2 row-start-1 text-right text-[15px]">{c.isFree ? 'Free' : 'Attorney fees'}</span>
                    {c.homeSummary && <span className="text-[15px]">{c.homeSummary}</span>}
                  </>
                );
                const row = 'grid grid-cols-[1fr_auto] gap-x-6 gap-y-1 py-4';
                return (
                  <li key={c._id} className={`border-b border-ink/15 ${i === 0 ? '[&>*]:pt-0' : ''}`}>
                    {c.slug ? (
                      <Link href={`/${c.slug}`} className={`${row} no-underline hover:[&>span:first-child]:underline`}>{inner}</Link>
                    ) : (
                      <div className={row}>{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <VideoFrame url={home.introVideoUrl} title="How Free Lawyer Finder works" />
          </div>
        </div>
      </section>

      {/* Questions, with who we are on the left. */}
      <section id="questions" aria-labelledby="questions-h" className="home-screen">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5">
            <h2 id="questions-h" className="t-h2">{home.faqHeading}</h2>
            <p className="mt-6 max-w-[48ch]">{home.faqIntro}</p>
            <Link href="/our-mission" className="link mt-6 inline-block">Read our mission</Link>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            {home.faqs.map((f) => (
              <div key={f._id} className="border-b border-ink/15 py-5 first:pt-0">
                <h3 className="text-[20px] leading-snug">{f.question}</h3>
                <div className="mt-2 text-[16px] leading-relaxed">
                  {typeof f.answer === 'string' ? <p>{f.answer}</p> : <PortableText value={f.answer} />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The films, on the page's one dark band. */}
      <section id="videos" aria-labelledby="videos-h" className="home-screen bg-ink text-paper">
        <div className="wrap">
          <h2 id="videos-h" className="t-h2 !text-paper">{home.videosHeading}</h2>
          <p className="mt-6 max-w-[56ch] text-paper/80">{home.videosIntro}</p>
          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-6">
            {home.videos.map((v) => (
              <article key={v.url}>
                <VideoFrame url={v.url} title={v.title} />
                <h3 className="mt-6 text-[20px] !text-paper">{v.title}</h3>
                <p className="mt-2 text-[15px] text-paper/80">{v.description}</p>
                <a href={v.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-[44px] items-center gap-2 font-medium text-paper underline decoration-paper/40 underline-offset-4 hover:decoration-paper">
                  Watch the film
                  <Icon name="arrow-right" size={16} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* The request form. */}
      <section id="match" aria-labelledby="match-h" className="home-screen">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5">
            <h2 id="match-h" className="t-h2">{home.formHeading}</h2>
            <p className="mt-6 max-w-[48ch]">{home.formIntro}</p>
            <ol className="mt-8 max-w-[48ch]">
              {home.formSteps.map((step, i) => (
                <li key={step} className="flex gap-4 border-b border-ink/15 py-4 first:pt-0">
                  <span className="t-label w-5 flex-none pt-0.5 text-muted">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <ContactForm context="home" submitLabel={home.primaryCtaLabel} caseTypes={cases.map((c) => c.title)} />
          </div>
        </div>
      </section>


    </>
  );
}
