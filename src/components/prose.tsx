// Shared prose presentation helpers for long editorial copy - used by review
// and battle pages. Pure text transforms: nothing here changes the words, only
// how they're broken up and emphasized.

// Sentence boundary: terminal punctuation (optionally followed by a closing
// quote/bracket), then whitespace, then a capital/number/dollar start. The
// whitespace requirement keeps decimals like "3.8" and "4.4/5" intact - a
// period inside a number is never followed by a space.
const SENTENCE_BOUNDARY = /(?<=[.!?]["')\]]*)\s+(?=[A-Z0-9$("'])/;

function toSentences(text: string): string[] {
  return text
    .split(SENTENCE_BOUNDARY)
    .map((s) => s.trim())
    .filter(Boolean);
}

// Splits copy at sentence boundaries: the first `n` sentences and the rest.
// Used for read-more treatments where all content must stay in the DOM.
export function splitSentences(text: string, n: number): [string, string] {
  const parts = toSentences(text);
  if (parts.length <= n) return [text, ""];
  return [parts.slice(0, n).join(" "), parts.slice(n).join(" ")];
}

// Bolds the decision-critical facts inside prose - prices, percentages,
// day/hour counts, review-count style numbers and short decimals (ratings,
// doses) - so a scanning reader catches the numbers first. One capture group
// only: the split below relies on alternating plain/matched parts.
export function BoldKeyFacts({ text }: { text: string }) {
  // Longer unit spellings first (month before mo) so "$69/month" bolds whole,
  // never as "$69/mo" + a stranded "nth".
  const re =
    /(\$[\d,]+(?:\.\d+)?(?:\/(?:month|mo|year|yr))?|\d+(?:\.\d+)?%|\b\d+(?:-\d+)?\s?(?:days?|hours?|weeks?|months?|tablets?)\b|\b\d{1,3}(?:,\d{3})+\b|\b\d{1,2}\.\d\b)/gi;
  const parts = text.split(re);
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-bold text-[#191919]">
            {p}
          </strong>
        ) : (
          p
        )
      )}
    </>
  );
}

// Renders a long single-paragraph string as readable prose: sentences are
// grouped two per paragraph with breathing room between them, and key facts
// are bolded. The words themselves are untouched - a text wall becomes
// scannable without editing a single claim.
export function ReadableProse({
  text,
  paragraphClassName,
  className = "",
}: {
  text: string;
  paragraphClassName: string;
  className?: string;
}) {
  const sentences = toSentences(text);
  const chunks: string[] = [];
  for (let i = 0; i < sentences.length; i += 2) {
    chunks.push(sentences.slice(i, i + 2).join(" "));
  }
  return (
    <div className={`space-y-3 ${className}`.trim()}>
      {chunks.map((c, i) => (
        <p key={i} className={paragraphClassName}>
          <BoldKeyFacts text={c} />
        </p>
      ))}
    </div>
  );
}
