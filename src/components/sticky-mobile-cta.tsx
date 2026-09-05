"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/config/site";
import { isForProsPath, quoteHref } from "@/lib/shell";

/**
 * Shared directory conversion shell — sticky mobile Get a quote CTA.
 * Hides while the on-page form is in view so it does not cover submit.
 */
export function StickyMobileCta() {
  const pathname = usePathname();
  const [formInView, setFormInView] = useState(false);

  useEffect(() => {
    const form = document.getElementById("quote");
    if (!form) {
      setFormInView(false);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setFormInView(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(form);
    return () => observer.disconnect();
  }, [pathname]);

  if (isForProsPath(pathname)) return null;
  if (pathname === "/request-sent" || pathname === "/request-sent/") return null;
  if (formInView) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 p-3 shadow-[0_-8px_24px_rgba(21,32,43,0.08)] backdrop-blur md:hidden">
      <a
        href={quoteHref(pathname)}
        className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-primary text-base font-medium text-primary-foreground hover:bg-primary/90"
      >
        Get a quote
      </a>
      <p className="mt-1 text-center text-xs text-muted-foreground">
        No credit card. {site.name} is a directory.
      </p>
    </div>
  );
}
