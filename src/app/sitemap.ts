import type { MetadataRoute } from "next";
import {
  absoluteUrl,
  cities,
  cityPath,
  servicePath,
  services,
} from "@/config/site";

import {
  cityPageLastmod,
  homePageLastmod,
  servicePageLastmod,
  staticPageLastmod,
} from "@/lib/lastmod";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/privacy/", "/for-pros/"].map((path) => ({
    url: absoluteUrl(path),
    lastModified:
      path === "/"
        ? homePageLastmod()
        : staticPageLastmod(`src/app${path}page.tsx`),
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.4,
  }));

  const cityRoutes = cities.flatMap((city) => [
    {
      url: absoluteUrl(cityPath(city)),
      lastModified: cityPageLastmod(
        city.slug,
        services.map((service) => service.slug)
      ),
      changeFrequency: "weekly" as const,
      priority: city.status === "live" ? 0.8 : 0.4,
    },
    ...services.map((service) => ({
      url: absoluteUrl(servicePath(city, service)),
      lastModified: servicePageLastmod(city.slug, service.slug),
      changeFrequency: "weekly" as const,
      priority:
        city.status === "live" && service.slug === "ac-repair" ? 0.9 : 0.5,
    })),
  ]);

  return [...staticRoutes, ...cityRoutes];
}
