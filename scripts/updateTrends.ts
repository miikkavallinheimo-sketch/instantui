import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { openai } from "../src/lib/openaiClient";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface InstantUiTrends {
  lastUpdated: string;
  yearFocus: string;
  fontTrends: any[];
  colorTrends: any[];
  designNotes: string[];
}

async function fetchTrends() {
  const queries = [
    "best web fonts for UI and product design 2025 and 2026",
    "trending google font pairings for websites 2025 and 2026",
    "trending colors in web design 2025 and 2026",
    "popular color palettes for SaaS and startup landing pages 2025",
    "modern UI design trends: minimalism, brutalism, gradients 2025"
  ];

  const prompt = `
You are a design trend researcher helping a tool called InstantUI.

1. Use web search to find CURRENT and NEAR-FUTURE trends (2025–2026) in:
   - UI/web fonts
   - UI/web color palettes

2. Focus on:
   - Fonts that are practical for product/UI (not just posters).
   - Color directions that are actually used on real websites (SaaS, portfolios, blogs).

3. Return STRICT JSON that matches this TypeScript interface:

interface InstantUiTrends {
  lastUpdated: string;
  yearFocus: string;
  fontTrends: {
    name: string;
    category: string;
    description: string;
    exampleUse: string;
  }[];
  colorTrends: {
    name: string;
    hex?: string;
    roleHint: string;
    description: string;
  }[];
  designNotes: string[];
}

4. VERY IMPORTANT:
   - Output ONLY valid JSON. No comments, no markdown, no explanation text.
   - If you are unsure of exact HEX codes, omit them or keep them approximate but realistic.
   - Prefer concrete, widely used trends instead of super niche things.
`;

  const response = await openai.responses.create({
    model: "gpt-5.1-mini",
    tools: [{ type: "web_search" }],
    input: [
      {
        role: "system",
        content:
          "You are a precise API that returns only JSON suitable for use in a design tool. Do not include any natural language outside JSON.",
      },
      {
        role: "user",
        content: `Research these queries and the current web: ${JSON.stringify(
          queries
        )}\n\n${prompt}`,
      },
    ],
  });

  const text = response.output_text;
  let data: InstantUiTrends = JSON.parse(text);

  data.lastUpdated = new Date().toISOString();
  if (!data.yearFocus) {
    data.yearFocus = "2025–2026";
  }

  const targetPath = path.join(__dirname, "..", "src", "data", "trends.json");
  await fs.mkdir(path.dirname(targetPath), { recursive: true });
  await fs.writeFile(targetPath, JSON.stringify(data, null, 2), "utf8");

  console.log("✅ Trends updated:", targetPath);
}

fetchTrends().catch((err) => {
  console.error("❌ Failed to update trends", err);
  process.exit(1);
});
