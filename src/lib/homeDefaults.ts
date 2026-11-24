// The redesigned home page copy. It is shown until a Home Page document is published in
// Sanity, and fills any field that document leaves empty. All of it comes from the live
// site and the FLF content rules: nothing here promises an outcome, a figure or a deadline.

export type HomeFaq = { _id: string; question: string; answer: string | any[] };
export type HomeVideo = { title: string; description: string; url: string };
export type HomeLane = { label: string; sub: string; icon: string };
export type HomeCase = { _id: string; title: string; slug?: string; homeSummary?: string; isFree: boolean };

export type HomeContent = {
  heroKicker: string;
  heroHeadline: string;
  heroLead: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  diagram: { inputLabel: string; inputSub: string; coreLabel: string; coreSub: string; lanes: HomeLane[] };
  statementLabel: string;
  statementText: string;
  statementHighlight: string;
  casesHeading: string;
  casesIntro: string;
  introVideoUrl: string;
  faqHeading: string;
  faqIntro: string;
  faqs: HomeFaq[];
  videosHeading: string;
  videosIntro: string;
  videos: HomeVideo[];
  formHeading: string;
  formIntro: string;
  formSteps: string[];
  closeHeading: string;
  closeLine: string;
  seoTitle: string;
  seoDescription: string;
};

export const homeDefaults: HomeContent = {
  heroKicker: '$0 to you, and no obligation to use the match',
  heroHeadline: 'Free lawyer matching for injury cases',
  heroLead:
    'For injury, job and malpractice cases: a person on our team reads what happened and introduces you to an attorney who handles cases like yours.',
  primaryCtaLabel: 'Request a free match',
  secondaryCtaLabel: 'See the case types',
  diagram: {
    inputLabel: 'What happened',
    inputSub: 'Your request',
    coreLabel: 'Our team',
    coreSub: 'A person reads it',
    lanes: [
      { label: 'Trucking', sub: 'Injury lawyer', icon: 'truck' },
      { label: 'Surgery', sub: 'Malpractice lawyer', icon: 'stethoscope' },
      { label: 'Firing', sub: 'Job lawyer', icon: 'briefcase' },
    ],
  },
  statementLabel: 'Why we exist',
  statementText:
    'The lawyer with the biggest billboard or the top Google ad is often the best marketer. People with a lawyer in the family get pointed to the right specialist, and we do that for everyone else.',
  statementHighlight: 'right specialist',
  casesHeading: 'Services and prices',
  casesIntro:
    'Lawyers specialise within each area: a strong truck accident lawyer may know little about malpractice, so we match on your kind of case.',
  introVideoUrl: 'https://www.youtube.com/watch?v=QLvpI12-ZLY',
  faqHeading: 'Questions about Free Lawyer Finder',
  faqIntro:
    'We are not lawyers. Our team has worked with law firms for years and saw that people with connections find good lawyers more easily than everyone else.',
  faqs: [
    { _id: 'f1', question: 'Does Free Lawyer Finder cost anything?', answer: 'No. We charge you nothing to find an attorney.' },
    { _id: 'f2', question: 'Do I have to hire the attorney you suggest?', answer: 'No. The match is a recommendation, and you decide whether to contact the attorney.' },
    { _id: 'f3', question: 'Does a real person review my request?', answer: 'Yes. A person on our team reads every request and picks the attorney; no algorithm or database sorts it.' },
    { _id: 'f4', question: 'Is Free Lawyer Finder a law firm?', answer: 'No. We are non-lawyers with years in the legal industry, and we do not give legal advice.' },
    { _id: 'f5', question: 'Can you help with criminal or family cases?', answer: 'Often, yes. We can connect you with local attorneys in these areas, who charge their own fees.' },
  ],
  videosHeading: 'How it works, in three videos',
  videosIntro: 'Short films from our team, one for each of three kinds of case.',
  videos: [
    { title: 'The injury process', description: 'A short film on the process for people who were hurt.', url: 'https://www.youtube.com/watch?v=ffggjaSVZMI' },
    { title: 'The employment process', description: 'A short film on the process for problems at work.', url: 'https://www.youtube.com/watch?v=7kTUbFHyeHs' },
    { title: 'The malpractice process', description: 'A short film on the process after a medical mistake.', url: 'https://www.youtube.com/watch?v=Ohb2_6x8imI' },
  ],
  formHeading: 'Request a free match',
  formIntro: 'Write what happened in a few sentences. A person on our team reads it and emails you the attorney we suggest.',
  formSteps: [
    'A person on our team reads what you wrote.',
    'We look for an attorney with experience in your kind of case.',
    'We email you the introduction, and you decide whether to use it.',
  ],
  closeHeading: 'Talk to a person about your case',
  closeLine: 'Free to you, with no obligation to use the attorney we suggest.',
  seoTitle: 'Free Lawyer Finder: free attorney matching',
  seoDescription:
    'A person on our team reads what happened to you and introduces you to an attorney who handles cases like yours, at no cost to you.',
};

// Shown when no Practice Area documents are published yet.
export const fallbackCases: HomeCase[] = [
  { _id: 'c1', title: 'Personal injury', slug: 'injury', homeSummary: 'Crashes, dog bites, falls and wrongful death.', isFree: true },
  { _id: 'c2', title: 'Employment', slug: 'employment', homeSummary: 'Firing, discrimination, harassment and unpaid wages.', isFree: true },
  { _id: 'c3', title: 'Medical malpractice', slug: 'medical-malpractice', homeSummary: 'Misdiagnosis, surgical errors and birth injuries.', isFree: true },
  { _id: 'c4', title: 'Drugs and medical devices', slug: 'pharmaceutical-medical-device', homeSummary: 'Harm from a defective drug or implant.', isFree: true },
  { _id: 'c5', title: 'Criminal defense', slug: 'criminal-defense', homeSummary: 'Charges of any kind; the attorney charges a fee.', isFree: false },
  { _id: 'c6', title: 'Family law', slug: 'family-law', homeSummary: 'Divorce, custody and support; the attorney charges a fee.', isFree: false },
];

// Merge a Sanity document over the defaults, field by field, so an empty field never blanks the page.
export function withDefaults(doc: Partial<HomeContent> | null | undefined): HomeContent {
  const out: any = { ...homeDefaults };
  if (!doc) return out;
  for (const [k, v] of Object.entries(doc)) {
    if (v === null || v === undefined || v === '' || (Array.isArray(v) && v.length === 0)) continue;
    out[k] = v;
  }
  out.diagram = { ...homeDefaults.diagram, ...(doc.diagram || {}) };
  if (!out.diagram.lanes || out.diagram.lanes.length !== 3) out.diagram.lanes = homeDefaults.diagram.lanes;
  return out;
}

export function youtubeId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  return m ? m[1] : null;
}
