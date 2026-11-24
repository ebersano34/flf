import Icon from '../Icon';
import { youtubeId } from '@/lib/homeDefaults';

// A client film as a still frame: YouTube's own poster, a play disc, and a link to the film.
// Nothing loads from YouTube until someone chooses to watch.
export default function VideoFrame({ url, title, className = '' }: { url: string; title: string; className?: string }) {
  const id = youtubeId(url);
  const base = process.env.NEXT_PUBLIC_POSTER_BASE || 'https://i.ytimg.com/vi';
  const poster = id ? `${base}/${id}/maxresdefault.jpg` : null;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Watch on YouTube: ${title}`}
      className={`group relative block aspect-video overflow-hidden rounded-frame bg-surface ${className}`}
    >
      {poster && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      )}
      <span className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-full bg-paper text-ink shadow">
        <Icon name="play" size={18} />
      </span>
    </a>
  );
}
