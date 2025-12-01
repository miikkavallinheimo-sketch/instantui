const loadedFonts = new Set<string>();

export async function ensureFontLoaded(font: string, source: "google" | "system" | "premium" = "google") {
  if (!font || source === "system") return;
  if (loadedFonts.has(font)) return;

  const encoded = font.replace(/\s+/g, "+");
  const id = `font-${encoded}`;
  if (!document.getElementById(id)) {
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${encoded}:wght@400;500;600;700;800&display=swap`;
    document.head.appendChild(link);
  }

  try {
    await document.fonts.load(`1rem "${font}"`);
    loadedFonts.add(font);
  } catch {
    // ignore failures, browser will fallback
  }
}
