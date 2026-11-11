import React from 'react';
import { toWords } from '@/lib/searchText';

/** Marks the words of `text` that the search matched (handles Arabic letter variants). */
const HighlightMatch: React.FC<{ text: string; words: string[] }> = ({ text, words }) => {
  if (words.length === 0) return <>{text}</>;
  const parts = text.split(/(\s+)/);
  return (
    <>
      {parts.map((part, i) => {
        const w = toWords(part)[0];
        const hit = w && words.some((q) => q.length >= 2 && (w === q || (q.length >= 3 && w.startsWith(q))));
        return hit ? (
          <mark key={i} className="bg-healthGold/30 text-inherit rounded-sm px-0.5">
            {part}
          </mark>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        );
      })}
    </>
  );
};

export default HighlightMatch;
