"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { isForProsPath, isPrivacyPath, quoteHref } from "@/lib/shell";

/**
 * Sticky mobile CTA — only <768. Hides when #quote is at least 40% in view.
 * Never on /for-pros/ or /privacy/.
 */
export function StickyMobileCta() {
  const pathname = usePathname();
  const [quoteInView, setQuoteInView] = useState(false);

  useEffect(() => {
    const form = document.getElementById("quote");
    if (!form) {
      setQuoteInView(false);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setQuoteInView(entry.intersectionRatio >= 0.4),
      { threshold: [0, 0.4, 1] }
    );
    observer.observe(form);
    return () => observer.disconnect();
  }, [pathname]);

  if (isForProsPath(pathname) || isPrivacyPath(pathname)) return null;
  if (quoteInView) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 p-3 shadow-[0_-8px_24px_rgba(21,32,43,0.08)] backdrop-blur md:hidden">
      <a
        href={quoteHref(pathname)}
        className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-primary text-[15px] leading-5 font-medium text-primary-foreground hover:bg-primary/90"
      >
        Get a quote
      </a>
    </div>
  );
}
