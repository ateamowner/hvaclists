/**
 * Homepage trust chips. Copy is locked.
 */
const items = [
  "No credit card",
  "Paid spots labeled",
  "Local city pages",
] as const;

export function TrustStrip({ className = "" }: { className?: string }) {
  return (
    <section aria-label="Directory promises" className={className}>
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-full border border-border bg-accent px-3 py-1.5 text-sm font-medium text-accent-foreground"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
