import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, ExternalLink } from "lucide-react";
import { HELP_TOPICS, helpLinkHref } from "@/lib/helpNavigator";

type Props = { isAr: boolean };

/** Small guided finder: pick what you need, see a few verified next steps. */
const HelpNavigator = ({ isAr }: Props) => {
  const [topicId, setTopicId] = useState<string | null>(null);
  const topic = HELP_TOPICS.find((t) => t.id === topicId) ?? null;
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const font = isAr ? "font-cairo" : "";

  return (
    <section
      id="how-can-we-help"
      aria-labelledby="how-can-we-help-title"
      className="py-6 md:py-8 bg-healthLightGray border-b scroll-mt-24 md:scroll-mt-32"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 id="how-can-we-help-title" className={`text-xl md:text-2xl font-bold text-healthDarkBlue mb-1 ${font}`}>
            {isAr ? "كيف يمكننا مساعدتك؟" : "How Can We Help You?"}
          </h2>
          <p className={`text-sm text-muted-foreground mb-4 ${font}`}>
            {isAr ? "اختر ما تحتاجه وسنريك أين تبدأ." : "Choose what you need and we will show you where to start."}
          </p>

          <div className="flex flex-wrap gap-2" role="group" aria-label={isAr ? "اختر ما تحتاجه" : "Choose what you need"}>
            {HELP_TOPICS.map((t) => {
              const active = t.id === topicId;
              return (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={active}
                  aria-controls="how-can-we-help-results"
                  onClick={() => setTopicId(active ? null : t.id)}
                  className={`min-h-[44px] px-4 py-2 rounded-full border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${font} ${
                    active
                      ? "bg-healthDarkBlue text-primary-foreground border-healthDarkBlue"
                      : "bg-background text-foreground border-border hover:border-healthDarkBlue"
                  }`}
                >
                  {isAr ? t.ar : t.en}
                </button>
              );
            })}
          </div>

          <div id="how-can-we-help-results" aria-live="polite" className="mt-4">
            {topic && (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2" aria-label={isAr ? topic.ar : topic.en}>
                {topic.links.map((link) => {
                  const href = helpLinkHref(link);
                  if (!href) return null;
                  const body = (
                    <>
                      <span className="flex-1 min-w-0">
                        <span className={`block font-semibold text-sm text-healthDarkBlue ${font}`}>
                          {isAr ? link.ar : link.en}
                        </span>
                        <span className={`block text-xs text-muted-foreground ${font}`}>
                          {isAr ? link.descAr : link.descEn}
                        </span>
                      </span>
                      {link.externalUrl ? (
                        <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                      ) : (
                        <Arrow className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                      )}
                    </>
                  );
                  const cls =
                    "flex items-center gap-3 min-h-[44px] h-full p-3 rounded-lg border bg-background hover:border-healthDarkBlue hover:shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
                  return (
                    <li key={link.id}>
                      {link.externalUrl ? (
                        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
                          {body}
                          <span className="sr-only">{isAr ? "(يفتح في نافذة جديدة)" : "(opens in a new tab)"}</span>
                        </a>
                      ) : (
                        <Link to={href} className={cls}>
                          {body}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpNavigator;
