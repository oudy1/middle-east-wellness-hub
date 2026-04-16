import { useMemo } from "react";

interface HighlightTextProps {
  text: string;
  query: string;
}

// Escape characters that have special meaning in RegExp
const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Renders `text` with case-insensitive matches of `query` wrapped in a <mark> tag.
 * Falls back to plain text when the query is empty.
 */
export const HighlightText = ({ text, query }: HighlightTextProps) => {
  const trimmed = query.trim();

  const parts = useMemo(() => {
    if (!trimmed) return [{ value: text, match: false }];
    const regex = new RegExp(`(${escapeRegExp(trimmed)})`, "gi");
    return text.split(regex).map((value) => ({
      value,
      match: value.toLowerCase() === trimmed.toLowerCase(),
    }));
  }, [text, trimmed]);

  if (!trimmed) return <>{text}</>;

  return (
    <>
      {parts.map((part, idx) =>
        part.match ? (
          <mark
            key={idx}
            className="bg-primary/20 text-foreground rounded px-0.5"
          >
            {part.value}
          </mark>
        ) : (
          <span key={idx}>{part.value}</span>
        )
      )}
    </>
  );
};

export default HighlightText;
