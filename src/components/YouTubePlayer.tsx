import { useState } from "react";
import { Play, ExternalLink } from "lucide-react";

interface Props {
  videoId: string;
  title: string;
  lang: "en" | "ar";
  /** Load the player straight away (e.g. inside a dialog the visitor just opened). */
  startLoaded?: boolean;
  /** Hide the small "Watch on YouTube" line when the caller already shows that button. */
  hideFallbackLink?: boolean;
}

/**
 * Privacy-friendly YouTube player: shows a still image until the visitor presses
 * play, then loads the youtube-nocookie player. A plain YouTube link is always
 * offered in case the player is blocked or fails to load.
 */
const YouTubePlayer = ({ videoId, title, lang, startLoaded = false, hideFallbackLink = false }: Props) => {
  const [loaded, setLoaded] = useState(startLoaded);
  const [thumbFailed, setThumbFailed] = useState(false);
  const isAr = lang === "ar";
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <div>
      <div className="relative w-full aspect-video bg-muted overflow-hidden">
        {loaded ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setLoaded(true)}
            className="group absolute inset-0 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
            aria-label={isAr ? `تشغيل الفيديو: ${title}` : `Play video: ${title}`}
          >
            {!thumbFailed && (
              <img
                src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
                alt=""
                loading="lazy"
                decoding="async"
                onError={() => setThumbFailed(true)}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform motion-safe:group-hover:scale-105">
              <Play className="h-7 w-7 ms-1" aria-hidden="true" />
            </span>
          </button>
        )}
      </div>
      {!hideFallbackLink && (
        <p className={`px-4 py-2 text-xs text-muted-foreground ${isAr ? "font-cairo text-right" : ""}`} dir={isAr ? "rtl" : "ltr"}>
          {isAr ? "لا يعمل الفيديو؟ " : "Video not loading? "}
          <a href={watchUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary underline underline-offset-2 min-h-[44px] sm:min-h-0">
            {isAr ? "شاهده على يوتيوب" : "Watch it on YouTube"}
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </a>
        </p>
      )}
    </div>
  );
};

export default YouTubePlayer;
