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
  queriesUsed?: string[]; // lisätään mukaan, debugiin ja läpinäkyvyyteen
}

/**
 * Vakiokategoriat: fontit, värit, UI-trendit, layoutit, brand-design
 * Nämä pysyvät samoina joka ajolla → tuottaa stabiilia dataa
 */
const BASE_QUERY_GROUPS: Record<string, string[]> = {
  fonts: [
    "best web fonts for UI and product design 2025 and 2026",
    "trending google font pairings for websites 2025 and 2026",
    "most popular sans-serif fonts for SaaS landing pages 2025",
  ],
  colors: [
    "trending colors in web design 2025 and 2026",
    "popular color palettes for SaaS and startup landing pages 2025",
    "3 color palette trends for dashboards and admin UI 2025",
  ],
  uiTrends: [
    "modern UI design trends: minimalism, neo-brutalism, gradients 2025",
    "current web UI design trends for product dashboards 2025",
  ],
  layouts: [
    "landing page layout trends for tech startups 2025",
    "hero section design trends for marketing sites 2025",
  ],
  brand: [
    "brand and visual identity trends for digital-first companies 2025",
  ],
};

const EXTRA_QUERY_COUNT = 2;

/**
 * Generoi 1–2 uutta hakulauseketta OpenAI:lla.
 * Nämä vaihtelevat joka ajolla ja täydentävät base-queries-listaa.
 */
async function generateExtraQueries(): Promise<string[]> {
  const baseQueryExamples = Object.values(BASE_QUERY_GROUPS).flat();

  const prompt = `
You help a tool called InstantUI discover current design trends.

You are given example search queries:

${JSON.stringify(baseQueryExamples, null, 2)}

Your task:
- Invent ${EXTRA_QUERY_COUNT} NEW search queries that could discover FRESH or EMERGING UI/web design trends for this week.
- Focus on fonts, colors, UI layouts, branding and real-world product websites.
- Keep each query under 140 characters.
- Avoid repeating the example queries.
- Make them concrete enough for web search (not vague).

Return STRICT JSON of this shape:

{
  "extraQueries": [
    "query 1 here",
    "query 2 here"
  ]
}

Do not include any text outside the JSON.
`;

  const response = await openai.responses.create({
    model: "gpt-4o-mini",
    input: [
      {
        role: "system",
        content:
          "You are a strict JSON generator. You ONLY output JSON and nothing else.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  let text = response.output_text;

  // Remove markdown backticks if present
  text = text.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");

  try {
    const parsed = JSON.parse(text) as { extraQueries?: string[] };
    if (Array.isArray(parsed.extraQueries)) {
      // Puhdistetaan tyhjät/rikkinäiset
      return parsed.extraQueries
        .map((q) => (typeof q === "string" ? q.trim() : ""))
        .filter((q) => q.length > 0);
    }
  } catch (err) {
    console.error("Failed to parse extraQueries JSON, falling back:", err);
  }

  // fallback: jos jokin menee pieleen, ei lisäqueryjä
  return [];
}

async function fetchTrends() {
  // 1) Kootaan base-queries
  const baseQueries = Object.values(BASE_QUERY_GROUPS).flat();

  // 2) Generoidaan dynaamiset lisähaut OpenAI:lla
  const extraQueries = await generateExtraQueries();

  const allQueries = [...baseQueries, ...extraQueries];

  const prompt = `
You are a design trend researcher helping a tool called InstantUI.

We are using these search queries (both static and AI-generated) to explore the web:

${JSON.stringify(allQueries, null, 2)}

1. Use web search to find CURRENT and NEAR-FUTURE trends (2025–2026) in:
   - UI/web fonts
   - UI/web color palettes
   - layout and UI patterns
   - branding/visual identity for digital products

2. Focus on:
   - Fonts that are practical for real UIs (products, dashboards, marketing sites).
   - Colors and palettes that are common on real websites (SaaS, portfolios, blogs, ecommerce).
   - Layout and interaction patterns actually used in production sites.

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
  queriesUsed?: string[];
}

4. VERY IMPORTANT:
   - Output ONLY valid JSON. No comments, no markdown, no explanation text.
   - If you are unsure of exact HEX codes, omit them or keep them approximate but realistic.
   - Prefer concrete, widely used trends instead of super niche things.
`;

  const response = await openai.responses.create({
    model: "gpt-4o-mini",
    tools: [{ type: "web_search" }],
    input: [
      {
        role: "system",
        content:
          "You are a precise API that returns only JSON suitable for use in a design tool. Do not include any natural language outside JSON.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  let text = response.output_text;

  // Remove markdown backticks if present
  text = text.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");

  let data: InstantUiTrends = JSON.parse(text);

  data.lastUpdated = new Date().toISOString();
  if (!data.yearFocus) {
    data.yearFocus = "2025–2026";
  }
  data.queriesUsed = allQueries;

  const targetPath = path.join(__dirname, "..", "src", "data", "trends.json");
  await fs.mkdir(path.dirname(targetPath), { recursive: true });
  await fs.writeFile(targetPath, JSON.stringify(data, null, 2), "utf8");

  console.log("✅ Trends updated:", targetPath);
  console.log("🔎 Base queries:", baseQueries.length);
  console.log("✨ Extra queries:", extraQueries);
}

fetchTrends().catch((err) => {
  console.error("❌ Failed to update trends", err);
  process.exit(1);
});
