import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { openai } from "../src/lib/openaiClient";
import type { GeneratedVibesResponse } from "../src/lib/types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const trendsPath = path.join(__dirname, "..", "src", "data", "trends.json");
  const trendsRaw = await fs.readFile(trendsPath, "utf8");

  const promptUser = `
You are given the latest InstantUI trend data:

${trendsRaw}

Based on this, generate NEW vibe presets for InstantUI.

Follow these rules:
- Do NOT reuse existing vibe names like "Minimal", "Modern SaaS", "Pastel", "Luxury", "Dark Tech", etc.
- Invent NEW vibe names based on actual 2025–2026 trends.
- Vibes must be practical for web UI (SaaS, portfolio, blog, ecommerce, dashboards).
- Use these roles for colors: "primary", "secondary", "accent", "background", "text".

Return ONLY JSON that matches this TypeScript interface:

interface GeneratedVibesResponse {
  generatedAt: string;
  vibes: {
    name: string;
    shortLabel: string;
    description: string;
    recommendedFonts: string[];
    recommendedColors: { name: string; hex?: string | null; role: "primary"|"secondary"|"accent"|"background"|"text" }[];
    suitability: string[];
    overrides: {
      primaryHue?: number | null;
      saturationBias?: number | null;
      lightnessBias?: number | null;
      borderRadius?: "sharp" | "medium" | "rounded" | null;
      useGradients?: boolean | null;
    };
  }[];
}

Return ONLY JSON, with no comments or additional text.
`;

  const response = await openai.responses.create({
    model: "gpt-4o-mini",
    tools: [{ type: "web_search" }],
    input: [
      {
        role: "system",
        content:
          "You are a strict JSON API that outputs only valid JSON for InstantUI. Do NOT include any natural language outside the JSON.",
      },
      { role: "user", content: promptUser },
    ],
  });

  const text = response.output_text;
  let data: GeneratedVibesResponse = JSON.parse(text);

  data.generatedAt = new Date().toISOString();

  const targetPath = path.join(
    __dirname,
    "..",
    "src",
    "data",
    "generatedVibes.json"
  );
  await fs.mkdir(path.dirname(targetPath), { recursive: true });
  await fs.writeFile(targetPath, JSON.stringify(data, null, 2), "utf8");

  console.log("✅ generatedVibes.json updated");
}

main().catch((err) => {
  console.error("❌ Failed to generate vibes:", err);
  process.exit(1);
});
