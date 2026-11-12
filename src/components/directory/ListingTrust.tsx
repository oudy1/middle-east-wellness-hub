import { Flag, Info, UserCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { reportListingMailto, type PublicHealthcareWorker } from "@/lib/healthcareDirectory";

const formatDate = (iso: string, isAr: boolean) =>
  new Date(iso).toLocaleDateString(isAr ? "ar-EG" : "en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "America/Toronto",
  });

/** Verified badge, last check date and a discreet report link for one listing. */
export const ListingTrust = ({
  worker,
}: {
  worker: Pick<PublicHealthcareWorker, "id" | "full_name" | "city" | "province" | "last_verified_at">;
}) => {
  const { language, t } = useLanguage();
  const isAr = language === "ar";
  const lng = isAr ? "ar" : "en";
  return (
    <div className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs text-muted-foreground">
      <span className="inline-flex items-center gap-1">
        <UserCheck className="h-3 w-3 text-healthTeal" aria-hidden="true" />
        {t("directory.verifiedBySHAMS", { lng })}
        {worker.last_verified_at && (
          <span> · {t("directory.lastChecked", { lng, date: formatDate(worker.last_verified_at, isAr) })}</span>
        )}
      </span>
      <a
        href={reportListingMailto(worker, lng)}
        className="inline-flex min-h-[44px] items-center gap-1 rounded-sm underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={t("directory.reportIncorrectLabel", { lng, name: worker.full_name })}
      >
        <Flag className="h-3 w-3" aria-hidden="true" />
        {t("directory.reportIncorrect", { lng })}
      </a>
    </div>
  );
};

/** Short note shown above directory results. */
export const DirectoryDisclaimer = () => {
  const { language, t } = useLanguage();
  return (
    <p
      className="mb-4 flex items-start gap-2 rounded-md border border-border bg-muted/40 p-3 text-sm text-muted-foreground"
      data-testid="directory-disclaimer"
    >
      <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <span>{t("directory.disclaimer", { lng: language === "ar" ? "ar" : "en" })}</span>
    </p>
  );
};
