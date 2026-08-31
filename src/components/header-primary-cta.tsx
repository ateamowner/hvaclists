"use client";

import { usePathname } from "next/navigation";
import { site } from "@/config/site";

const buttonClassName =
  "inline-flex h-10 items-center rounded-md bg-primary px-3 text-primary-foreground hover:bg-primary/90";

export function HeaderPrimaryCta() {
  const pathname = usePathname();
  const onForPros = pathname === "/for-pros" || pathname === "/for-pros/";

  if (onForPros) {
    return (
      <a href={site.featuredCheckoutUrl} className={buttonClassName}>
        Subscribe — $99/month
      </a>
    );
  }

  return (
    <a href="#quote" className={buttonClassName}>
      Get a quote
    </a>
  );
}
