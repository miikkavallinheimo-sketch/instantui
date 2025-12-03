import type { CSSProperties } from "react";
import type { DesignState, BorderToken } from "../lib/types";
import { contrastRatio, hexToHsl, hslToHex } from "../lib/colorUtils";

interface PreviewDashboardProps {
  designState: DesignState;
  isAnalyzing?: boolean;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const adjustLightness = (hex: string, delta: number) => {
  const { h, s, l } = hexToHsl(hex);
  const nextL = clamp(l + delta, 0, 100);
  return hslToHex(h, s, nextL);
};

const mixWithBackground = (hex: string, bg: string, weight: number) => {
  const fgHsl = hexToHsl(hex);
  const bgHsl = hexToHsl(bg);
  const w = clamp(weight, 0, 1);
  const mix = {
    h: fgHsl.h * w + bgHsl.h * (1 - w),
    s: fgHsl.s * w + bgHsl.s * (1 - w),
    l: fgHsl.l * w + bgHsl.l * (1 - w),
  };
  const hue = (mix.h % 360 + 360) % 360;
  return hslToHex(hue, clamp(mix.s, 0, 100), clamp(mix.l, 0, 100));
};

const ensureReadableColor = (bg: string, preferred: string) => {
  const pref = contrastRatio(bg, preferred);
  const white = contrastRatio(bg, "#ffffff");
  const black = contrastRatio(bg, "#000000");
  const target = 3;

  if (pref >= target) return preferred;
  if (white >= black) {
    return white >= target ? "#ffffff" : preferred;
  }
  return black >= target ? "#000000" : preferred;
};

const getBorderStyle = (token: BorderToken, colors: DesignState["colors"]) => {
  if (token === "none") return "0px solid transparent";
  const color =
    token === "subtle" ? colors.borderSubtle : colors.borderStrong;
  return `1px solid ${color}`;
};

const radiusMap = {
  none: "0px",
  sm: "6px",
  md: "10px",
  lg: "16px",
  xl: "24px",
  full: "9999px",
} as const;

const shadowMap = {
  none: "none",
  xs: "0 1px 2px rgba(15,23,42,0.05)",
  sm: "0 2px 8px rgba(15,23,42,0.08)",
  md: "0 4px 16px rgba(15,23,42,0.12)",
  lg: "0 8px 24px rgba(15,23,42,0.16)",
  xl: "0 12px 40px rgba(15,23,42,0.22)",
  "2xl": "0 24px 60px rgba(15,23,42,0.35)",
} as const;

const sizeMap = {
  xs: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
} as const;

const PreviewDashboard = ({ designState, isAnalyzing = false }: PreviewDashboardProps) => {
  const { colors, fontPair, typography, uiTokens } = designState;
  const navBg = adjustLightness(colors.primary, designState.vibe.isDarkUi ? 6 : -10);
  const navAccent = adjustLightness(colors.primary, designState.vibe.isDarkUi ? 16 : -22);
  const navText = "#ffffff";
  const navTextMuted = "rgba(255,255,255,0.75)";
  const surface = colors.surface;
  const surfaceAlt = colors.surfaceAlt;
  const subtle = colors.borderSubtle;
  const textMuted = colors.textMuted;
  const searchTextColor = ensureReadableColor(surface, textMuted);
  const subheadingTokens =
    typography.subheading ?? {
      size: typography.heading.size === "2xl" ? "xl" : "lg",
      weight: Math.max(typography.body.weight, typography.heading.weight - 200),
      style: typography.heading.style,
      transform: typography.heading.transform ?? "none",
    };
  const accentReadableOnSurface =
    typography.accent.color ??
    (contrastRatio(surface, colors.accent) >= 3.2 ? colors.accent : colors.primary);
  const bodyTextColor =
    typography.body.color ??
    (contrastRatio(surface, colors.text) >= 4.5 ? colors.text : colors.onAccent);
  const headingTransform = typography.heading.transform ?? "none";
  const subheadingTransform = subheadingTokens.transform ?? "none";
  const bodyTransform = typography.body.transform ?? "none";
  const accentTransform = typography.accent.transform ?? "none";

  const summaryCards = [
    {
      label: "Active Billing",
      value: "€12.7k",
      note: "+5.1% month",
      textColor: colors.primary,
      background: colors.surface,
    },
    {
      label: "Product Seats",
      value: "18,204",
      note: "2.1% growth",
      textColor: colors.secondary,
      background: colors.surfaceAlt,
    },
    {
      label: "Trial Conversion",
      value: "37%",
      note: "target 40%",
      textColor: colors.onSecondary,
      background: colors.secondary,
    },
    {
      label: "Churn",
      value: "2.3%",
      note: "down from 3.1%",
      textColor: colors.onAccent,
      background: colors.accent,
    },
  ];

  const trendData = [
    { month: "Jan", values: [12, 8, 5] },
    { month: "Feb", values: [14, 7, 6] },
    { month: "Mar", values: [15, 9, 5] },
    { month: "Apr", values: [13, 10, 4] },
    { month: "May", values: [16, 8, 5] },
    { month: "Jun", values: [17, 10, 6] },
    { month: "Jul", values: [14, 8, 7] },
  ];

  const supportTickets = [
    { name: "aava.helenius@novaco.app", issue: "Invoice mismatch", status: "Open" },
    { name: "kalle@flowforge.io", issue: "Plan upgrade", status: "Pending" },
    { name: "liisa.l@aurora.email", issue: "Bug reproduction", status: "Closed" },
    { name: "mikko.t@draftwind.dev", issue: "Beta access", status: "Open" },
  ];

  const transactions = [
    { name: "S. Evergreen", tier: "Pro", value: "+$49" },
    { name: "B. Sterling", tier: "Advanced", value: "+$99" },
    { name: "O. Meadows", tier: "Basic", value: "+$19" },
    { name: "H. Hawthorne", tier: "Basic", value: "+$19" },
    { name: "I. Whitman", tier: "Enterprise", value: "+$299" },
    { name: "E. Frost", tier: "Basic", value: "+$19" },
    { name: "M. Sinclair", tier: "Pro", value: "+$49" },
  ];

  const donutSections = [
    { label: "Basic", value: 40, color: colors.secondary },
    { label: "Pro", value: 30, color: colors.primary },
    { label: "Enterprise", value: 30, color: colors.accent },
  ];

  const headingStyles = [
    typography.heading,
    typography.subheading ?? {
      size: typography.heading.size === "2xl" ? "xl" : "lg",
      weight: Math.max(typography.heading.weight - 200, 400),
      style: typography.heading.style,
    },
  ];

  const rootStyle: CSSProperties = {
    backgroundColor: colors.background,
    color: colors.text,
    "--radius-card": radiusMap[uiTokens.card.radius],
    "--shadow-card": shadowMap[uiTokens.card.shadow],
    "--border-card": getBorderStyle(uiTokens.card.border, colors),
    "--radius-button-primary": radiusMap[uiTokens.buttonPrimary.radius],
    "--shadow-button-primary": shadowMap[uiTokens.buttonPrimary.shadow],
    "--border-button-primary": getBorderStyle(
      uiTokens.buttonPrimary.border,
      colors
    ),
    "--radius-button-secondary": radiusMap[uiTokens.buttonSecondary.radius],
    "--shadow-button-secondary": shadowMap[uiTokens.buttonSecondary.shadow],
    "--border-button-secondary": getBorderStyle(
      uiTokens.buttonSecondary.border,
      colors
    ),
    "--radius-pill": radiusMap[uiTokens.buttonSecondary.radius],
    "--shadow-pill": shadowMap[uiTokens.buttonSecondary.shadow],
    "--border-pill": getBorderStyle(uiTokens.buttonSecondary.border, colors),
  } as React.CSSProperties;

  return (
    <div
      className="w-full"
      style={rootStyle}
    >
      {isAnalyzing && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="text-6xl font-bold text-white/80 tracking-wider select-none"
               style={{
                 animation: `fadeInOutGentle 800ms ease-in-out forwards`,
                 textShadow: '0 4px 24px rgba(0,0,0,0.2)',
               }}>
            Analyzing...
          </div>
          <style>{`
            @keyframes fadeInOutGentle {
              0% { opacity: 0; }
              25% { opacity: 0.6; }
              75% { opacity: 0.6; }
              100% { opacity: 0; }
            }
          `}</style>
        </div>
      )}
      <div className="flex flex-col lg:flex-row min-h-[640px]">
        <aside
          className="w-full lg:w-64 p-6 flex flex-col gap-6"
          style={{ backgroundColor: navBg, color: navText }}
        >
          <div>
            <div
              className="text-lg font-semibold"
              style={{ fontFamily: fontPair.heading, color: navText }}
            >
              Elementry
            </div>
            <div
              className="text-xs opacity-80"
              style={{ fontFamily: fontPair.body, color: navTextMuted }}
            >
              {designState.vibe.label}
            </div>
          </div>

          <nav className="flex flex-col gap-2 text-sm" style={{ fontFamily: fontPair.body }}
          >
            {["Pulse", "Revenue", "Segments", "Content", "Settings", "Labs"].map(
              (item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg"
                  style={{
                    backgroundColor: index === 0 ? navAccent : "transparent",
                    opacity: index === 0 ? 1 : 0.85,
                  }}
                >
                  <span className="inline-flex h-2 w-2 rounded-full bg-white/70" />
                  <span>{item}</span>
                </div>
              )
            )}
          </nav>

          <div className="mt-auto">
            <button
              className="px-4 py-2 rounded-full text-sm"
              style={{
                backgroundColor: navText,
                color: navBg,
                fontFamily: fontPair.heading,
              }}
            >
              Log out
            </button>
          </div>
        </aside>

        <main className="flex-1 p-6 space-y-6" style={{ backgroundColor: colors.background }}>
          <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div
              style={{
                fontFamily: fontPair.heading,
                fontSize: sizeMap[typography.heading.size],
                fontWeight: typography.heading.weight,
                fontStyle: typography.heading.style,
                textTransform: headingTransform,
                color: typography.heading.color ?? colors.text
              }}
            >
              Command Center
            </div>
              <p
                style={{ fontFamily: fontPair.body, fontSize: sizeMap[typography.body.size], fontWeight: typography.body.weight, fontStyle: typography.body.style, color: bodyTextColor }}
              >
                Monitor health metrics and content performance.
              </p>
              <div
                className="text-base mt-2"
                style={{
                  fontFamily: fontPair.heading,
                  fontSize: sizeMap[subheadingTokens.size],
                  fontWeight: subheadingTokens.weight,
                  fontStyle: subheadingTokens.style,
                  textTransform: subheadingTransform,
                  color: typography.subheading?.color ?? subheadingTokens.color ?? colors.text,
                }}
              >
                Latest Release Summary
              </div>
            </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div
              className="flex items-center px-4 py-2 rounded-full w-full md:w-64"
              style={{
                backgroundColor: surface,
                  border: `1px solid ${subtle}`,
                  fontFamily: fontPair.body,
                  color: searchTextColor,
                }}
              >
                Search transactions...
              </div>
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
                style={{
                  backgroundColor: colors.primary,
                  color: colors.onPrimary,
                  fontFamily: fontPair.heading,
                }}
              >
                AV
              </div>
            </div>
          </header>

          <div className="flex flex-col gap-2 sm:flex-row text-xs" style={{ fontFamily: fontPair.body }}>
            <div
              className="token-pill px-3 py-2"
              style={{ backgroundColor: surface, color: colors.text }}
            >
              Heading font:{" "}
              <span style={{ fontFamily: fontPair.heading }} className="font-semibold">
                {fontPair.heading}
              </span>
            </div>
            <div
              className="token-pill px-3 py-2"
              style={{ backgroundColor: surfaceAlt, color: colors.text }}
            >
              Body font:{" "}
              <span style={{ fontFamily: fontPair.body }} className="font-semibold">
                {fontPair.body}
              </span>
            </div>
        </div>

          <section className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wide opacity-60" style={{ fontFamily: fontPair.body }}>
              Buttons
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                className="token-button token-button-primary px-5 py-2"
                style={{
                  fontFamily: fontPair.heading,
                  fontSize: sizeMap[typography.accent.size],
                  fontWeight: typography.accent.weight,
                  fontStyle: typography.accent.style,
                  backgroundColor: colors.primary,
                  color: colors.onPrimary,
                }}
              >
                Primary
              </button>
              <button
                className="token-button token-button-secondary px-5 py-2"
                style={{
                  fontFamily: fontPair.heading,
                  fontSize: sizeMap[typography.accent.size],
                  fontWeight: typography.accent.weight,
                  fontStyle: typography.accent.style,
                  backgroundColor: "transparent",
                  color: colors.primary,
                }}
              >
                Secondary
              </button>
              <button
                className="token-button token-button-primary px-5 py-2"
                style={{
                  fontFamily: fontPair.heading,
                  fontSize: sizeMap[typography.accent.size],
                  fontWeight: typography.accent.weight,
                  fontStyle: typography.accent.style,
                  backgroundColor: colors.accent,
                  color: colors.onAccent,
                }}
              >
                Accent
              </button>
              <button
                className="token-button token-button-secondary px-5 py-2"
                style={{
                  fontFamily: fontPair.body,
                  fontSize: sizeMap[typography.body.size],
                  fontWeight: typography.body.weight,
                  fontStyle: typography.body.style,
                  backgroundColor: "transparent",
                  color: colors.text,
                  border: `1px dashed ${colors.textMuted}`,
                }}
              >
                Ghost
              </button>
            </div>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {summaryCards.map((card) => (
              <div
                key={card.label}
                className={`token-card p-4 ${
                  designState.vibe.id === "gradient-bloom"
                    ? "token-card-bloom"
                    : ""
                }`}
                style={{
                  backgroundColor: card.background,
                }}
              >
                <div
                  className="text-xs uppercase tracking-wide"
                  style={{
                    fontFamily: fontPair.body,
                    color: ensureReadableColor(card.background, textMuted),
                    opacity: 0.8,
                  }}
                >
                  {card.label}
                </div>
                <div
                  className="text-2xl mt-2 font-semibold"
                  style={{
                    fontFamily: fontPair.heading,
                    color: ensureReadableColor(card.background, card.textColor),
                  }}
                >
                  {card.value}
                </div>
                <div
                  className="text-xs mt-1"
                  style={{
                    color: ensureReadableColor(card.background, textMuted),
                    fontFamily: fontPair.body,
                  }}
                >
                  {card.note}
                </div>
              </div>
            ))}
          </section>

          <section
           className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm"
            style={{ fontFamily: fontPair.body }}
          >
            <div
              className="token-card p-4 space-y-3"
              style={{ backgroundColor: surface }}
            >
              <div className="text-xs uppercase tracking-wide opacity-70">
                Headings (H1 & H2) — {fontPair.heading}
              </div>
              {headingStyles.map((style, idx) => (
                <div
                  key={idx}
                  style={{
                    fontFamily: fontPair.heading,
                    fontSize: sizeMap[style.size],
                    fontWeight: style.weight,
                    fontStyle: style.style,
                    textTransform: style.transform ?? "none",
                  }}
                >
                  {idx === 0 ? "Primary headline" : "Secondary headline"}
                </div>
              ))}
            </div>
            <div
              className="token-card p-4 space-y-3"
              style={{ backgroundColor: surfaceAlt }}
            >
              <div className="text-xs uppercase tracking-wide opacity-70">
                Body / Light — {fontPair.body}
              </div>
              <div
                style={{
                  fontFamily: fontPair.body,
                  fontSize: sizeMap[typography.body.size],
                  fontWeight: typography.body.weight,
                  fontStyle: typography.body.style,
                  color: bodyTextColor,
                  textTransform: bodyTransform,
                }}
              >
                Standard body text lives here for long-form copy.
              </div>
              <div
                className="opacity-70"
                style={{
                  fontFamily: fontPair.body,
                  fontSize: sizeMap[typography.accent.size],
                  fontWeight: typography.accent.weight,
                  fontStyle: typography.accent.style,
                  color: accentReadableOnSurface,
                  textTransform: accentTransform,
                }}
              >
                Light/label style uses accent settings.
              </div>
            </div>
          </section>
          <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <div
              className="token-card p-4 flex flex-col gap-4 col-span-1 xl:col-span-2"
              style={{ backgroundColor: surface }}
            >
              <div className="flex items-center justify-between">
                <div
                  className="font-semibold"
                  style={{ fontFamily: fontPair.heading }}
                >
                  Momentum
                </div>
                <div
                  className="text-xs px-3 py-1 rounded-full"
                  style={{ backgroundColor: surfaceAlt, color: textMuted }}
                >
                  This year
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                <div className="flex flex-col justify-end gap-2">
                  {trendData.map((row) => (
                    <div key={row.month} className="flex items-end gap-1">
                      {row.values.map((value, idx) => {
                        const color = [colors.primary, colors.secondary, colors.accent][idx];
                        return (
                          <div
                            key={idx}
                            className="flex-1 rounded-t"
                            style={{
                              backgroundColor: adjustLightness(color, designState.vibe.isDarkUi ? 12 : 0),
                              height: `${value * 6}px`,
                            }}
                          />
                        );
                      })}
                      <span
                        className="text-[11px] ml-2"
                        style={{ fontFamily: fontPair.body, color: textMuted }}
                      >
                        {row.month}
                      </span>
                    </div>
                  ))}
                </div>
                <div
                  className="rounded-lg p-4 flex flex-col justify-center"
                  style={{ backgroundColor: surfaceAlt, color: bodyTextColor }}
                >
                  <div
                    style={{
                      fontFamily: fontPair.heading,
                      fontSize: sizeMap[typography.heading.size],
                      fontWeight: typography.heading.weight,
                      textTransform: headingTransform,
                    }}
                  >
                    Primary headline
                  </div>
                  <div
                    style={{
                      fontFamily: fontPair.heading,
                      fontSize: sizeMap[subheadingTokens.size],
                      fontWeight: subheadingTokens.weight,
                      textTransform: subheadingTransform,
                    }}
                  >
                    Secondary headline
                  </div>
                  <p
                    className="mt-3"
                    style={{ fontFamily: fontPair.body, fontSize: sizeMap[typography.body.size], textTransform: bodyTransform }}
                  >
                    Body copy preview demonstrates long-form typography on this background. Use
                    this block to verify contrast between headings and paragraph text.
                  </p>
                </div>
              </div>
                <div className="flex gap-4 text-xs" style={{ fontFamily: fontPair.body, color: bodyTextColor }}>
                {["New", "Renewals", "Churns"].map((label, idx) => (
                  <div key={label} className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: [colors.primary, colors.secondary, colors.accent][idx] }}
                    />
                    <span style={{ color: textMuted }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="token-card p-4 flex flex-col gap-4"
              style={{ backgroundColor: surface }}
            >
              <div className="flex items-center justify-between">
                <div className="font-semibold" style={{ fontFamily: fontPair.heading }}>
                  Plan Mix
                </div>
                <div className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: surfaceAlt, color: textMuted }}>
                  This year
                </div>
              </div>
              <div className="flex items-center justify-center relative py-6">
                <div className="h-32 w-32 rounded-full" style={{ backgroundColor: surfaceAlt }} />
                <div className="absolute h-24 w-24 rounded-full" style={{ backgroundColor: colors.background }} />
                <div className="absolute text-center">
                  <div className="text-2xl font-semibold" style={{ fontFamily: fontPair.heading }}>
                    342
                  </div>
                  <div className="text-xs" style={{ color: textMuted }}>
                    Sales
                  </div>
                </div>
                {donutSections.map((segment, idx) => (
                  <div
                    key={segment.label}
                    className="absolute h-32 w-32 rounded-full border-[8px]"
                    style={{
                      borderColor: segment.color,
                      transform: `rotate(${idx * 110}deg)`,
                      clipPath: "polygon(0 0, 50% 0, 50% 50%, 0 50%)",
                      opacity: 0.7,
                    }}
                  />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs" style={{ fontFamily: fontPair.body, color: bodyTextColor }}>
                {donutSections.map((segment) => (
                  <div key={segment.label} className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: segment.color }} />
                    <span style={{ color: textMuted }}>{segment.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <div
              className="token-card p-4 space-y-4"
              style={{ backgroundColor: surface }}
            >
              <div className="flex items-center justify-between">
                <div className="font-semibold" style={{ fontFamily: fontPair.heading }}>
                  Inbox Digest
                </div>
                <div className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: surfaceAlt, color: textMuted }}>
                  This week
                </div>
              </div>
              <div className="flex gap-2 text-xs flex-wrap" style={{ fontFamily: fontPair.body }}>
                {["All", "Open", "Pending", "Closed"].map((filter, index) => (
                  <span
                    key={filter}
                    className="token-pill px-3 py-1"
                    style={{
                      backgroundColor: index === 0 ? colors.primary : surfaceAlt,
                      color: index === 0 ? colors.onPrimary : textMuted,
                    }}
                  >
                    {filter}
                  </span>
                ))}
              </div>
              <div className="space-y-3">
                {supportTickets.map((ticket) => (
                  <div key={ticket.name} className="flex items-center justify-between gap-3 text-xs" style={{ fontFamily: fontPair.body }}>
                    <div>
                      <div className="font-medium" style={{ color: colors.text }}>
                        {ticket.name}
                      </div>
                      <div style={{ color: textMuted }}>{ticket.issue}</div>
                    </div>
                    <span
                      className="px-3 py-1 rounded-full border text-[11px]"
                      style={{ borderColor: colors.primary, color: colors.primary }}
                    >
                      {ticket.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="token-card p-4 space-y-4 col-span-1 xl:col-span-2"
              style={{ backgroundColor: surface }}
            >
              <div className="flex items-center justify-between">
                <div className="font-semibold" style={{ fontFamily: fontPair.heading }}>
                  Activity Log
                </div>
                <button
                  className="px-4 py-1 rounded-full text-xs"
                  style={{ backgroundColor: colors.primary, color: colors.onPrimary, fontFamily: fontPair.heading }}
                >
                  View all
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm" style={{ fontFamily: fontPair.body }}>
                {transactions.map((transaction) => (
                  <div
                    key={transaction.name}
                    className="flex items-center justify-between rounded-xl px-3 py-2 border"
                    style={{ borderColor: subtle, backgroundColor: surfaceAlt }}
                  >
                    <div>
                      <div className="font-medium">{transaction.name}</div>
                      <div className="text-xs" style={{ color: textMuted }}>
                        {transaction.tier}
                      </div>
                    </div>
                    <span
                      className="text-xs px-3 py-1 rounded-full font-semibold"
                      style={{
                        backgroundColor: adjustLightness(colors.accent, designState.vibe.isDarkUi ? 20 : 35),
                        color: colors.onAccent,
                      }}
                    >
                      {transaction.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <div
              className="text-xs font-semibold opacity-60"
              style={{ fontFamily: fontPair.body }}
            >
              Palette Tokens
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
              {[
                { name: "Primary", color: colors.primary },
                { name: "Secondary", color: colors.secondary },
                { name: "Accent", color: colors.accent },
                { name: "Background", color: colors.background },
                { name: "Surface", color: colors.surface },
                { name: "Surface Alt", color: colors.surfaceAlt },
                { name: "Text", color: colors.text },
                { name: "Text Muted", color: colors.textMuted },
                { name: "Border Subtle", color: colors.borderSubtle },
                { name: "Border Strong", color: colors.borderStrong },
              ].map((swatch) => (
                <div
                  key={swatch.name}
                  className="rounded-xl p-3 border flex flex-col gap-2 justify-between h-24"
                  style={{ borderColor: subtle, backgroundColor: surface }}
                >
                  <div
                    className="w-full h-8 rounded-md border"
                    style={{
                      backgroundColor: swatch.color,
                      borderColor: swatch.color,
                    }}
                  />
                  <div className="text-[11px] font-medium" style={{ color: textMuted }}>
                    {swatch.name}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default PreviewDashboard;
