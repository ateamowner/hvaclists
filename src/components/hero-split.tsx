/**
 * Shared directory conversion shell — hero split.
 * Honesty / local copy on the left; form card on the right.
 * Niche palette stays in site.ts / CSS tokens.
 */
export function HeroSplit({
  children,
  form,
}: {
  children: React.ReactNode;
  form: React.ReactNode;
}) {
  return (
    <section
      id="hero"
      className="grid items-start gap-8 md:grid-cols-[minmax(0,1fr)_minmax(20rem,24rem)]"
    >
      <div>{children}</div>
      <div className="md:sticky md:top-24 md:self-start">{form}</div>
    </section>
  );
}
