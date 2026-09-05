"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { isForProsPath, quoteHref } from "@/lib/shell";

/**
 * Shared directory conversion shell — sticky mobile Get a quote CTA.
 * Appears after the hero scrolls off screen. Links to #quote.
 */
export function StickyMobileCta() {
  const pathname = usePathname();
  const [heroGone, setHeroGone] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      setHeroGone(false);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setHeroGone(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname]);

  if (isForProsPath(pathname)) return null;
  if (pathname === "/request-sent" || pathname === "/request-sent/") return null;
  if (!heroGone) return null;

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
