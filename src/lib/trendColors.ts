const TREND_COLORS: Record<
  "primary" | "secondary" | "accent" | "background" | "text",
  string[]
> = {
  primary: ["#2563EB", "#F97316", "#0EA5E9", "#8B5CF6"],
  secondary: ["#7C3AED", "#9333EA", "#EC4899", "#0F172A"],
  accent: ["#FACC15", "#22D3EE", "#F87171", "#10B981"],
  background: ["#F8FAFC", "#0F172A", "#FFF7ED", "#111827"],
  text: ["#0F172A", "#F8FAFC", "#1F2937", "#F3F4F6"],
};

export function getTrendColor(
  role: keyof typeof TREND_COLORS,
  seed: number
) {
  const options = TREND_COLORS[role];
  const index = Math.floor(Math.abs(Math.sin(seed * 1237)) * options.length);
  return options[index % options.length];
}
