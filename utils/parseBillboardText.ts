export interface IBillboardEntry {
  title: string;
  altTitle?: string;
  releaseDate?: string;
}

const MONTHS: Record<string, string> = {
  enero: "01",
  febrero: "02",
  marzo: "03",
  abril: "04",
  mayo: "05",
  junio: "06",
  julio: "07",
  agosto: "08",
  septiembre: "09",
  octubre: "10",
  noviembre: "11",
  diciembre: "12",
};

const DATE_LINE = /^(\d{1,2})\s+([a-záéíóú]+)\s+(\d{4})$/i;
const LABELS =
  /^(estreno|preventa|cartelera|pronto|filtrar por|contenido alternativo|clasificaci[oó]n por confirmar|para todo el p[uú]blico|recomendada para .*|exclusiva para .*)$/i;

const toIsoDate = (line: string): string | undefined => {
  const match = line.match(DATE_LINE);
  const month = match && MONTHS[match[2].toLowerCase()];
  return match && month
    ? `${match[3]}-${month}-${match[1].padStart(2, "0")}`
    : undefined;
};

// Acepta dos formatos: un título por línea, o el texto copiado de la página de
// películas de Cine Colombia, donde cada película termina en "Estreno:" y su
// fecha. En ese caso se omite lo marcado como "Preventa".
export const parseBillboardText = (text: string): IBillboardEntry[] => {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const entries: IBillboardEntry[] = [];
  if (lines.some((line) => /^estreno:$/i.test(line))) {
    let block: string[] = [];
    let isPreSale = false;
    lines.forEach((line, index) => {
      if (/^estreno:$/i.test(line)) {
        const titles = block.filter((item) => !LABELS.test(item));
        if (!isPreSale && titles.length) {
          entries.push({
            title: titles[0],
            altTitle: titles[1],
            releaseDate: toIsoDate(lines[index + 1] ?? ""),
          });
        }
        block = [];
        isPreSale = false;
        return;
      }
      if (toIsoDate(line) && /^estreno:$/i.test(lines[index - 1] ?? "")) return;
      // Las pestañas Cartelera, Pronto y Preventa terminan en "Filtrar por".
      if (/^filtrar por$/i.test(line)) {
        block = [];
        isPreSale = false;
        return;
      }
      if (/^preventa$/i.test(line)) isPreSale = true;
      block.push(line);
    });
  } else {
    lines
      .filter((line) => !LABELS.test(line))
      .forEach((title) => entries.push({ title }));
  }

  const seen = new Set<string>();
  return entries.filter(({ title }) => {
    const key = title.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};
