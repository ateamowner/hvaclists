import type { Metadata } from "next";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/config/site";
import "./globals.css";

const sans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — HVAC directory`,
    template: `%s`,
  },
  description: site.description,
  applicationName: site.name,
};

const themeVars = Object.entries({
  "--background": site.theme.background,
  "--foreground": site.theme.foreground,
  "--card": site.theme.card,
  "--card-foreground": site.theme.foreground,
  "--primary": site.theme.primary,
  "--primary-foreground": site.theme.primaryForeground,
  "--secondary": site.theme.muted,
  "--secondary-foreground": site.theme.foreground,
  "--muted": site.theme.muted,
  "--muted-foreground": site.theme.mutedForeground,
  "--accent": site.theme.accent,
  "--accent-foreground": site.theme.accentForeground,
  "--border": site.theme.border,
  "--input": site.theme.border,
  "--ring": site.theme.ring,
  "--destructive": "#8b1e1e",
})
  .map(([key, value]) => `${key}: ${value}`)
  .join("; ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        {/*
          Bing Webmaster Tools (msvalidate.01):
          Anthony must add hvaclists.com in Bing Webmaster Tools and paste the
          real verification code here as:
            <meta name="msvalidate.01" content="PASTE_CODE_FROM_BING" />
          Do not invent a code.
        */}
        {/*
          Google site verification:
          HTML file already ships at /googled3ae2edf58b5b2f8.html.
          If Bing/Google asks for a meta tag instead, paste the real
          google-site-verification content here. Do not invent a code.
        */}
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <style>{`:root { ${themeVars}; }`}</style>
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
