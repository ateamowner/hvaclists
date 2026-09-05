import Link from "next/link";

/** Homepage For HVAC companies band. CTA goes to /for-pros/. */
export function ForProsBand() {
  return (
    <section className="mt-14 rounded-[16px] border border-border bg-accent px-4 py-8 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-heading text-xl font-semibold text-accent-foreground">
          For HVAC companies
        </h2>
        <Link
          href="/for-pros/"
          className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-5 text-[15px] leading-5 font-medium text-primary-foreground hover:bg-primary/90"
        >
          Featured — $99/month
        </Link>
      </div>
    </section>
  );
}
