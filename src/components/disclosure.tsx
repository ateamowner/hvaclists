import { site } from "@/config/site";

export function Disclosure({ className = "" }: { className?: string }) {
  return (
    <p className={`text-sm leading-6 text-muted-foreground ${className}`}>
      {site.disclosure}
    </p>
  );
}
