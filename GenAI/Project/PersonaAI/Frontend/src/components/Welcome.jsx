import { Sparkles } from "lucide-react";

const PROMPTS = [
  "Explain this error message to me",
  "Write a regex for matching emails",
  "Compare useEffect and useLayoutEffect",
  "Optimize this SQL query",
];

export default function Welcome({ onPick }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">
        <Sparkles size={26} className="text-accent" />
      </div>
      <h1 className="text-2xl font-semibold text-text-primary">Hanji, batao 👋</h1>
      <p className="mt-2 max-w-md text-sm text-text-secondary">
        Ask me anything — code, concepts, or a second opinion. I'll do my best to
        explain it clearly.
      </p>

      <div className="mt-8 grid w-full max-w-lg grid-cols-1 gap-2 sm:grid-cols-2">
        {PROMPTS.map((prompt) => (
          <button
            key={prompt}
            onClick={() => onPick?.(prompt)}
            className="rounded-xl border border-border bg-card px-4 py-3 text-left text-sm text-text-secondary transition-colors hover:border-accent/40 hover:text-text-primary cursor-pointer"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}
