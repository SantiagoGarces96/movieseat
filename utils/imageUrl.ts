import { IMAGE_HOSTS } from "@/constants/imageHosts.mjs";

export const IMAGE_HOST_ERROR = `La imagen debe ser propia (/images/...) o venir de uno de estos sitios: ${IMAGE_HOSTS.join(", ")}`;

export const isAllowedImageUrl = (value: string): boolean => {
  // Imágenes propias del proyecto, guardadas en public/images.
  if (/^\/images\/[\w/.-]+$/.test(value) && !value.includes("..")) return true;
  try {
    const { protocol, hostname } = new URL(value);
    return protocol === "https:" && IMAGE_HOSTS.includes(hostname);
  } catch {
    return false;
  }
};
