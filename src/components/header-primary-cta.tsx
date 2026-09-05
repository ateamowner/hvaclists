"use client";

import { usePathname } from "next/navigation";
import { quoteHref } from "@/lib/shell";

const buttonClassName =
  "inline-flex h-10 items-center rounded-lg bg-primary px-3.5 text-[15px] leading-5 font-medium text-primary-foreground hover:bg-primary/90";

export function HeaderPrimaryCta() {
  const pathname = usePathname();

  return (
    <a href={quoteHref(pathname)} className={buttonClassName}>
      Get a quote
    </a>
  );
}
