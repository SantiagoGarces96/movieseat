// Las búsquedas usan expresiones regulares de MongoDB. Escapar el texto evita
// que caracteres como "(" o "*" rompan la búsqueda o la vuelvan muy lenta.
export const escapeRegex = (text: string): string =>
  text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
