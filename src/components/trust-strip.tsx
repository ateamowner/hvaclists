/**
 * Shared directory conversion shell — trust strip.
 * Copy is fixed: No credit card · Paid spots labeled · Local pages.
 */
const items = ["No credit card", "Paid spots labeled", "Local pages"] as const;

export function TrustStrip({ className = "" }: { className?: string }) {
  return (
    <section
      aria-label="Directory promises"
      className={`rounded-[16px] border border-border bg-accent px-4 py-3 ${className}`}
    >
      <ul className="flex flex-col items-start gap-2 text-sm font-medium text-accent-foreground sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
        {items.map((item, index) => (
          <li key={item} className="flex items-center">
            {index > 0 ? (
              <span
                aria-hidden="true"
                className="mx-3 hidden text-accent-foreground/60 sm:inline"
              >
                ·
              </span>
            ) : null}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
