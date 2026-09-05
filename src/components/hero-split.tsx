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
    <section className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,24rem)]">
      <div>{children}</div>
      <div className="lg:sticky lg:top-24 lg:self-start">{form}</div>
    </section>
  );
}
