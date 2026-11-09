import type { MetadataRoute } from "next";
import { SITE_URL } from "@/constants/site";

const PUBLIC_PAGES = ["", "/releases", "/upcoming", "/foods", "/about"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_PAGES.map((path) => ({ url: `${SITE_URL}${path}` }));
}
