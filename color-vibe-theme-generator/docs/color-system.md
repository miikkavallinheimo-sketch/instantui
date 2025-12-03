# Color System & Vibes (Using Primary / Secondary / Accent)

This document explains how the theme generator works conceptually, using your
actual token names:

- `primary`, `secondary`, `accent`
- `background`, `text`
- `onPrimary`, `onSecondary`, `onAccent`
- `surface`, `surfaceAlt`
- `textMuted`
- `borderSubtle`, `borderStrong`

The generator behaves like Coolors: the user selects a **vibe**, presses **Space**
and gets a full theme (colors, fonts, buttons, pills, etc.). The **first five**
colors (`primary`, `secondary`, `accent`, `background`, `text`) can be locked.

Everything else (`on*`, `surface*`, `textMuted`, `border*`) is **derived automatically**
from these five base colors + the chosen vibe.


## 1. Base Tokens (5 lockable colors)

These are the only colors that can be locked by the user:

- `primary` – main brand color, used on primary buttons, key highlights
- `secondary` – supporting color for secondary CTAs, highlights, pills
- `accent` – extra pop color for tags, small highlights, badges
- `background` – main page background
- `text` – main text color (usually dark in light mode, light in dark mode)

The generator always outputs these five tokens first.


## 2. Derived Tokens (auto-generated)

From the 5 base colors, the generator produces:

- `onPrimary` – text/icon color on top of `primary`
- `onSecondary` – text/icon color on top of `secondary`
- `onAccent` – text/icon color on top of `accent`
- `surface` – card backgrounds, panels, sections above `background`
- `surfaceAlt` – alternate surface tone for contrast between blocks
- `textMuted` – secondary text color (labels, helper text, meta data)
- `borderSubtle` – low-contrast borders (cards, inputs)
- `borderStrong` – higher-contrast borders (focus states, dividers)

These are never edited directly by the user – they follow simple rules:
contrast, saturation limits and vibe presets.


## 3. Vibes and Palette Algorithms

Each **vibe** controls how the 5 base colors are generated.

### 3.1 Modern SaaS

- `primary` – bright blue / violet range
- `secondary` – analogous color (blue-violet / blue-cyan)
- `accent` – split-complementary (often green or orange)
- `background` – cool very light gray/blue
- `text` – dark neutral gray (not pure black)

Internally this uses:

- Brand-based semantic palette
- Analogous + split-complementary logic
- Neutral, slightly bluish backgrounds

### 3.2 Soft Edgy

- Softer, pastel-like `primary`, `secondary`, `accent`
- Higher contrast in `text` vs. `background`
- Backgrounds slightly warm or off-white
- Good for stylish, minimal but friendly UIs

Algorithm:

- Use analogous spread with low chroma
- Pastel OKLCH values (high lightness, moderate chroma)
- Neutral text and subtle surfaces


### 3.3 Neon Digital

- Very saturated `primary` / `accent` colors
- Dark `background`, near black
- `text` is light gray/white
- Edgy, cyberpunk / gamer / Gen-Z feel

Algorithm:

- High chroma for primary and accent
- Contrast via lightness (dark backgrounds, bright text)
- Neutrals stay very dark


### 3.4 Classic Editorial

- Neutral-dominant
- `primary` and `accent` used sparsely
- `background` and `surface` very important
- Works for magazines, editorial layouts, “serious” content

Algorithm:

- Start with strong neutrals (off-white, charcoal)
- Add one or two muted accent hues
- Lower saturation for all color tokens


### 3.5 Earthy

- Nature-inspired palette
- `primary` / `secondary` / `accent` around greens, browns, terracotta
- Golden angle hue jumps for natural spreads
- Great for wellness, organic, travel, interior, nature content

Algorithm:

- Use hue rotations of ~137.5°
- Chroma around mid levels
- Light, warm backgrounds and neutral text


## 4. Mapping Theory → Your Token Names

In more theoretical terms we often talk about:

- brand
- accent1
- accent2
- neutralDark
- neutralLight

In your naming scheme the mapping is:

- `brand`        → `primary`
- `accent1`      → `secondary`
- `accent2`      → `accent`
- `neutralDark`  → `text`
- `neutralLight` → `background`

All other tokens are derived from combinations of these five base colors.


## 5. Derivation Rules (Simplified)

The actual code in `deriveTokensFromBase` uses logic like:

- `onPrimary`, `onSecondary`, `onAccent`:
  - choose either `#ffffff` or `#000000`/`text` based on WCAG contrast
- `surface`:
  - slightly lighter or darker than `background`, depending on vibe
- `surfaceAlt`:
  - one more step away from `background` to create visual levels
- `textMuted`:
  - desaturate + lighten/darken `text` by a small amount
- `borderSubtle`:
  - blend between `surface` and `text` (low contrast)
- `borderStrong`:
  - blend between `primary` and `text` (higher contrast)

You can tune the exact thresholds and multipliers per vibe.


## 6. Dark Mode (Optional Extension)

If you add dark mode later, the tokens remain the same, but:

- `background` becomes dark
- `text` becomes light
- `surface` / `surfaceAlt` move closer to dark neutrals
- `primary` / `secondary` / `accent` are brightened slightly
- `on*` tokens updated to preserve contrast

The same token model works for both schemes – you just change the generator.