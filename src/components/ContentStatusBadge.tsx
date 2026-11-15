import { Badge } from "@/components/ui/badge";
import { STATUS_TEXT } from "@/lib/contentStatus";

/** Shared status pill for admin review pages, so every list shows the same words and colours. */
const ContentStatusBadge = ({ status, label, lang = "en" }: { status: string; label?: string; lang?: "en" | "ar" }) => {
  const s = STATUS_TEXT[status];
  return <Badge variant={s?.tone ?? "secondary"}>{label ?? s?.[lang] ?? status}</Badge>;
};

export default ContentStatusBadge;
