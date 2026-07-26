---
name: FinPort
description: Playful local-first portfolio dashboard for allocation, investment logs, and advisory Thai tax-wrapper timing.
colors:
  primary-blue: "#2563eb"
  focus-blue: "#3b82f6"
  soft-blue-surface: "#dbeafe"
  unlock-emerald: "#10b981"
  lock-amber: "#f59e0b"
  caution-red: "#ef4444"
  danger-soft: "#fef2f2"
  danger-deep: "#7f1d1d"
  rmf-violet: "#8b5cf6"
  gold: "#eab308"
  slate-950: "#020617"
  slate-900: "#0f172a"
  slate-800: "#1e293b"
  slate-700: "#334155"
  slate-600: "#475569"
  slate-500: "#64748b"
  slate-400: "#94a3b8"
  slate-300: "#cbd5e1"
  slate-200: "#e2e8f0"
  slate-100: "#f1f5f9"
  slate-50: "#f8fafc"
  white: "#ffffff"
typography:
  display:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 300
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.33
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 500
    lineHeight: 1.56
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.43
  caption:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  surface: "24px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "20px"
  xl: "24px"
  "2xl": "32px"
  "3xl": "48px"
components:
  button-primary:
    backgroundColor: "{colors.primary-blue}"
    textColor: "{colors.white}"
    rounded: "{rounded.lg}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "#1d4ed8"
    textColor: "{colors.white}"
    rounded: "{rounded.lg}"
    padding: "12px 24px"
  button-neutral:
    backgroundColor: "{colors.slate-900}"
    textColor: "{colors.white}"
    rounded: "{rounded.lg}"
    padding: "12px 24px"
  button-secondary:
    backgroundColor: "{colors.slate-200}"
    textColor: "{colors.slate-900}"
    rounded: "{rounded.lg}"
    padding: "10px 16px"
  glass-card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.slate-900}"
    rounded: "{rounded.surface}"
    padding: "24px"
  input-default:
    backgroundColor: "{colors.white}"
    textColor: "{colors.slate-900}"
    rounded: "{rounded.lg}"
    padding: "10px 16px"
  nav-active:
    backgroundColor: "{colors.soft-blue-surface}"
    textColor: "{colors.primary-blue}"
    rounded: "{rounded.lg}"
    padding: "12px 16px"
---

# Design System: FinPort

## 1. Overview

**Creative North Star: "Playful Wealth Console"**

FinPort is a private, local-first portfolio console that should feel light enough for personal maintenance and precise enough for real money decisions. The interface is playful but numerically calm: it can use soft gradients, rounded panels, and small celebratory touches, but the numbers, categories, and advisory tax-wrapper timing always stay legible and sober.

The visual system is a restrained product UI with a signature layer of translucent glass. Use that glass as a soft personal-dashboard material for primary panels, navigation chrome, and the occasional highlighted module. Do not let it become decoration for its own sake; FinPort is not a corporate banking dashboard, and it is not a crypto/trading terminal.

**Key Characteristics:**
- Local-first and private, with browser-storage confidence visible in settings and backup flows.
- Soft glass panels over blue, emerald, and violet ambient gradients.
- Blue is the action and selection color; category color is reserved for allocation meaning.
- Rounded, friendly controls with practical product density.
- Playful moments are allowed when they mark completion or affection, never when they compete with portfolio data.

## 2. Colors

The palette is a cool slate product base with one action blue, portfolio category colors, and advisory status colors for unlock timing.

### Primary
- **Action Blue**: The primary action, focus, selected navigation, current value, and remaining-to-invest color. Use `primary-blue` for solid actions and `focus-blue` for rings, charts, and active glow.

### Secondary
- **Unlock Emerald**: The tax-unlock and success color. Use it for ThaiESG/RMF readiness, positive sync states, and the soft unlock module. Do not use it for generic decoration.
- **Lock Amber**: The lock and waiting color. Use it for pending tax-wrapper status and cautionary timing information.
- **RMF Violet**: The RMF foreign-equity category color. It belongs in charts and category encoding, not in primary actions.
- **Gold**: The gold allocation color. Keep it informational; avoid making it a premium-finance brand color.
- **Soft Danger**: `danger-soft` and `danger-deep` are hover-fill support colors for destructive icon buttons. Keep destructive actions quiet until the user points at them.

### Neutral
- **Deep Slate**: The dark-mode body and high-contrast text family (`slate-950`, `slate-900`, `slate-800`).
- **Readable Slate**: Secondary text and labels (`slate-600`, `slate-500`, `slate-400`).
- **Mist Slate**: Dividers, inactive fills, and empty-state surfaces (`slate-200`, `slate-100`, `slate-50`).
- **Glass White**: The light-mode panel material. In code it is usually white at 30-50% opacity with a blur, but the normative primitive is `white`.

### Named Rules
**The Blue Does Work Rule.** Blue is for selection, action, focus, and key totals. Do not spend it on decorative flourishes.

**The Category Means Category Rule.** Violet, emerald, amber, gold, and slate category colors are semantic allocation colors. They should not be reassigned to unrelated UI states.

## 3. Typography

**Display Font:** Space Grotesk with ui-sans-serif, system-ui, sans-serif fallback.
**Body Font:** Inter with ui-sans-serif, system-ui, sans-serif fallback.
**Label/Mono Font:** Inter; there is no separate mono layer.

**Character:** Space Grotesk gives headings a friendly console feel without becoming ornamental. Inter carries labels, forms, navigation, and data because FinPort is a working product surface.

### Hierarchy
- **Display** (300, 1.875rem, 1.2 line-height): Page titles such as Dashboard, Settings, and Add Investment Log.
- **Headline** (600, 1.5rem, 1.33 line-height): Large money values, total portfolio numbers, and major summaries.
- **Title** (500, 1.125rem, 1.56 line-height): Card headings, section titles, and fund names.
- **Body** (400, 1rem, 1.5 line-height): Supporting copy, field values, empty states, and explanatory settings text.
- **Label** (500, 0.875rem, 1.43 line-height): Field labels, small metric labels, nav labels, badges, and status text.
- **Caption** (500, 0.75rem, 1 line-height): Mobile dock labels, compact helper text, and wrapper chips only.

### Named Rules
**The Data First Type Rule.** Use display typography for page orientation only. Fund names, amounts, labels, and settings must stay in practical product sizes.

## 4. Elevation

FinPort uses a hybrid of tonal layering, translucent panels, blur, and very soft shadows. The default panel is not a hard card; it is a calm glass surface: white or slate at 40% opacity, a 24px corner radius, a 1px translucent border, backdrop blur, and a low ambient shadow.

### Shadow Vocabulary
- **Glass Ambient** (`0 8px 30px rgb(0,0,0,0.04)`): Default light-mode panel shadow for summary cards, forms, settings sections, and list rows.
- **Dark Glass Ambient** (`0 8px 30px rgb(0,0,0,0.1)`): Dark-mode companion shadow when a panel needs separation from the slate background.
- **Mobile Dock Lift** (`0 -8px 32px 0 rgba(0,0,0,0.05)`): Bottom navigation shadow only.
- **Chart Tooltip Lift** (`0 4px 6px -1px rgb(0 0 0 / 0.1)`): Small floating chart tooltip shadow.

### Named Rules
**The Sparse Glass Rule.** Glass is a FinPort signature, not a universal answer. Use it for structural panels and chrome; avoid nested glass unless the child is a compact status row inside a single parent module.

## 5. Components

### Buttons
- **Shape:** Rounded friendly rectangles (12px radius).
- **Primary:** Action Blue background with white text, medium weight, and 12px by 24px padding.
- **Hover / Focus:** Hover darkens from `primary-blue` to `#1d4ed8`; focus uses a 2px `focus-blue` ring.
- **Secondary / Ghost / Tertiary:** Neutral actions use slate surfaces. Icon-only destructive actions use red text on a soft red hover surface rather than a solid red button.

### Chips
- **Style:** Wrapper labels use compact 4px chips with `slate-100` or `slate-800` backgrounds and muted slate text.
- **State:** Tax lock state uses amber for locked and emerald for unlocked. These are statuses, not category colors.

### Cards / Containers
- **Corner Style:** Large soft panels (24px radius) and compact inner rows (16px radius).
- **Background:** Light panels use `rgba(255,255,255,0.4)`; dark panels use `rgba(15,23,42,0.4)`.
- **Shadow Strategy:** Use Glass Ambient at rest. Hover may slightly increase panel opacity, not shadow drama.
- **Border:** 1px translucent white border in light mode; 1px translucent slate border in dark mode.
- **Internal Padding:** Standard panel padding is 24px; dense forms can step up to 32px on larger screens.

### Inputs / Fields
- **Style:** 12px radius, translucent white or slate background, 1px translucent border, 10px vertical and 16px horizontal padding.
- **Focus:** 2px Action Blue ring and a slightly more opaque background.
- **Error / Disabled:** Disabled buttons use opacity and cursor changes. Error fields are not fully standardized yet; future work should use red border/text without changing the base field shape.

### Navigation
- **Style:** Desktop uses a 256px glass sidebar with icon-plus-label rows. Mobile uses a fixed glass bottom dock.
- **States:** Active navigation has a soft blue surface and blue text; inactive items use muted slate and a plain hover fill.
- **Mobile Treatment:** Keep labels short and icon-led. The bottom dock is lifted with the Mobile Dock Lift shadow.

### Charts and Progress
- **Style:** Donut charts and progress bars use category colors from `CATEGORY_COLORS`.
- **Behavior:** Progress bars animate width over 500ms. Category color must match the category; do not restyle chart colors per page.

### Vibe Credit
- **Style:** The footer credit is a small rounded-full text button with a blue hover/focus state.
- **Behavior:** It triggers a celebratory screen flash and confetti layer. Keep this as an affectionate personal-dashboard detail, not a general motion pattern.

## 6. Do's and Don'ts

### Do:
- **Do** preserve the "Playful Wealth Console" balance: friendly surfaces, clear numbers, and calm financial hierarchy.
- **Do** use Action Blue for real work: primary actions, focus rings, active nav, and highlighted current values.
- **Do** keep RMF/ThaiESG unlock messaging advisory and visually distinct from definitive financial advice.
- **Do** reuse 24px glass panels, 12px inputs/buttons, and 16px compact rows so the app feels coherent.
- **Do** keep English and Thai labels readable inside their controls before adding more ornament.

### Don't:
- **Don't** make FinPort look or feel like a corporate banking dashboard.
- **Don't** make FinPort look or feel like a crypto/trading terminal.
- **Don't** turn category colors into decoration; they encode allocation meaning.
- **Don't** stack glass cards inside glass cards except for compact status rows that need grouping.
- **Don't** add high-drama motion to data surfaces. The vibe effect is a signature moment, not the default behavior.
