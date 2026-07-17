export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 rounded-2xl bg-bubble-ai px-4 py-3 w-fit">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-2 w-2 rounded-full bg-text-secondary animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}
