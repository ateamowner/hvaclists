/**
 * Consumer-shell trust chips. Copy is locked — exactly these three.
 */
const items = [
  "No credit card",
  "Paid spots labeled",
  "We hold your request",
] as const;

export function TrustStrip({ className = "" }: { className?: string }) {
  return (
    <section aria-label="Directory promises" className={className}>
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-medium text-foreground"
          >
            <span
              aria-hidden="true"
              className="mr-2 inline-block size-1.5 rounded-full bg-accent align-middle"
            />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
