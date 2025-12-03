# Color Vibe Theme Generator – Cursor Starter Kit

This mini-project is meant to be dropped into your existing UI design tool.
It gives you:

- A clear **color token model** using your names:
  - `primary`, `secondary`, `accent`
  - `background`, `text`
  - `onPrimary`, `onSecondary`, `onAccent`
  - `surface`, `surfaceAlt`
  - `textMuted`
  - `borderSubtle`, `borderStrong`
- A `generateTheme` function that:
  - takes a `vibe`
  - respects **locked** base colors
  - returns a **full theme** ready to plug into CSS variables

Use this as a reference / scaffolding file in Cursor. You can paste the contents
into your existing repo and then start wiring it to your actual state management,
UI components and keyboard shortcuts (space to randomize, locks, etc.).