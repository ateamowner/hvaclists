import { site } from "@/config/site";

export function Disclosure({ className = "" }: { className?: string }) {
  return (
    <p className={`text-sm leading-6 text-muted-foreground ${className}`}>
      {site.disclosure} Contact:{" "}
      <a href={`mailto:${site.email}`} className="underline underline-offset-2">
        {site.email}
      </a>
      .
    </p>
  );
}
