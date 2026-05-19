import { useEffect, useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Props {
  faqId: string;
  language: string;
  isArabic: boolean;
}

const STORAGE_KEY = "shams-faq-votes";

const loadVotes = (): Record<string, "up" | "down"> => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
};

const FAQFeedback = ({ faqId, language, isArabic }: Props) => {
  const [vote, setVote] = useState<"up" | "down" | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const votes = loadVotes();
    if (votes[faqId]) setVote(votes[faqId]);
  }, [faqId]);

  const handleVote = async (value: "up" | "down") => {
    if (vote || submitting) return;
    setSubmitting(true);
    const sessionId = localStorage.getItem("shams-session-id") || crypto.randomUUID();
    localStorage.setItem("shams-session-id", sessionId);

    const { error } = await supabase.from("faq_votes").insert({
      faq_id: faqId,
      vote: value,
      language,
      session_id: sessionId,
    });

    setSubmitting(false);

    if (error) {
      toast({
        title: isArabic ? "حدث خطأ" : "Something went wrong",
        variant: "destructive",
      });
      return;
    }

    const votes = loadVotes();
    votes[faqId] = value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(votes));
    setVote(value);
    toast({
      title: isArabic ? "شكرا على ملاحظتك" : "Thanks for your feedback",
    });
  };

  return (
    <div className="flex items-center gap-3 pt-3 border-t border-border text-xs">
      <span className="text-muted-foreground">
        {vote
          ? isArabic
            ? "شكرا على ملاحظتك"
            : "Thanks for your feedback"
          : isArabic
          ? "هل كان هذا مفيدا؟"
          : "Was this helpful?"}
      </span>
      {!vote && (
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => handleVote("up")}
            disabled={submitting}
            aria-label={isArabic ? "مفيد" : "Helpful"}
            className="p-1.5 rounded-md hover:bg-muted transition-colors disabled:opacity-50"
          >
            <ThumbsUp className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => handleVote("down")}
            disabled={submitting}
            aria-label={isArabic ? "غير مفيد" : "Not helpful"}
            className="p-1.5 rounded-md hover:bg-muted transition-colors disabled:opacity-50"
          >
            <ThumbsDown className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
      {vote === "up" && <ThumbsUp className="h-3.5 w-3.5 text-primary" />}
      {vote === "down" && <ThumbsDown className="h-3.5 w-3.5 text-muted-foreground" />}
    </div>
  );
};

export default FAQFeedback;
