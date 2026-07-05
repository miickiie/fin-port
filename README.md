# FinPort

FinPort is a local-first personal investment portfolio tracker. It focuses on target allocation, investment logging, Thai RMF/ThaiESG unlock visibility, bilingual UI, and optional Google Apps Script webhook sync.

The app is a static React single-page app built with Vite. Portfolio data is stored in the browser by default, so it can be used locally without a backend.

## Features

- Dashboard with total target, invested cost, remaining amount, category allocation chart, target progress, and upcoming RMF/ThaiESG unlocks.
- Investment log form for date, fund or asset name, target category, wrapper type, invested amount, optional current value, and notes.
- History view for holdings and prior logs, including wrapper labels, current value where available, unlock status for tax wrappers, and delete/revert actions.
- Target allocation editor for adjusting planned amounts per category and reviewing the total planned portfolio size.
- Settings for date of birth, theme, language, Google Apps Script webhook URL, manual sync, and JSON backup export.
- English and Thai localization.
- Light, dark, and system theme modes.
- Local persistence through `localStorage`.

## Portfolio Categories

The default plan uses six target categories:

- `RMF_FOREIGN_EQUITY`
- `GLOBAL_EQUITY`
- `THAI_ESG_EQUITY`
- `THAI_ESG_FIXED_INCOME`
- `GOLD`
- `CASH`

Supported wrapper types are `RMF`, `ThaiESG`, `Normal`, `Cash`, and `Gold`.

## Tax Unlock Logic

The app calculates unlock dates for planning visibility only. Do not treat these calculations as tax, legal, or financial advice.

- ThaiESG unlock date: buy date plus 5 years.
- RMF unlock date: the later of buy date plus 5 years and the user's 55th birthday.
- RMF calculations require date of birth in Settings.
- Non-tax wrappers are treated as having no lock condition.

Important: the current source code includes a note that real ThaiESG rules may differ from the app's 5-year rule. Verify current regulations before relying on the output.

## Data Storage And Backup

FinPort stores state in the browser under the `portfolio_tracker_data` localStorage key. The stored state contains:

- `logs`: investment log entries.
- `targets`: target allocation rows.
- `settings`: date of birth, theme, language, and optional Google Apps Script webhook URL.

Clearing browser site data will remove the local portfolio unless it has been backed up or synced elsewhere.

The Settings screen can export the current state to `portfolio_backup.json`. The source has an internal `importData` action, but the visible Settings UI currently exposes export only.

## Optional Google Apps Script Sync

Settings accepts a Google Apps Script webhook URL such as:

```text
https://script.google.com/macros/s/.../exec
```

When configured, the app POSTs the current `logs`, `targets`, and `settings` JSON payload to that URL using `fetch` with `mode: 'no-cors'` and a `text/plain;charset=utf-8` content type.

This repository does not include the Apps Script backend. The webhook must be created and managed separately.

## Tech Stack

- React 19
- TypeScript
- Vite 6
- Tailwind CSS 4 through `@tailwindcss/vite`
- Recharts for allocation charts
- date-fns for date parsing and formatting
- lucide-react for icons
- clsx and tailwind-merge for class composition

The package currently also declares dependencies that are not used by active app source, including `@google/genai`, `dotenv`, `express`, and `motion`. Avoid assuming those are app features unless the code changes.

## Project Structure

```text
.
|-- index.html
|-- metadata.json
|-- package.json
|-- package-lock.json
|-- tsconfig.json
|-- vite.config.ts
`-- src
    |-- App.tsx
    |-- main.tsx
    |-- index.css
    |-- components
    |   |-- Layout.tsx
    |   `-- views
    |       |-- AllocationEditor.tsx
    |       |-- Dashboard.tsx
    |       |-- Holdings.tsx
    |       |-- LogForm.tsx
    |       `-- Settings.tsx
    |-- lib
    |   |-- taxEngine.ts
    |   `-- utils.ts
    |-- locales
    |   |-- en.ts
    |   |-- th.ts
    |   `-- useTranslation.ts
    |-- store
    |   `-- PortfolioContext.tsx
    |-- constants.ts
    `-- types.ts
```

## Getting Started

### Prerequisites

- Node.js
- npm

The GitHub Pages workflow uses Node 24. The repository does not declare a local Node engine in `package.json`, so use Node 24 locally if you want to match CI.

### Install Dependencies

```bash
npm install
```

### Run The Development Server

```bash
npm run dev
```

The dev server is configured to listen on port `3000` and host `0.0.0.0`.

Open:

```text
http://localhost:3000
```

### Build

```bash
npm run build
```

The production build is written to `dist`.

### Preview A Production Build

```bash
npm run preview
```

### Type Check

```bash
npm run lint
```

Despite the script name, this runs TypeScript with `tsc --noEmit`; there is no separate ESLint configuration in the current repository.

### Clean Generated Output

```bash
npm run clean
```

This removes `dist` and `server.js`.

## Environment Variables

No Gemini API key is required by the current app source. The old AI Studio README instruction to set `GEMINI_API_KEY` was stale.

`vite.config.ts` reads `DISABLE_HMR` for development behavior:

- `DISABLE_HMR=true` disables Vite HMR and file watching.
- Any other value leaves HMR enabled.

No `.env` file is required for normal local use.

## Deployment

The repository includes a GitHub Pages workflow at `.github/workflows/deploy.yml`.

Deployment runs on pushes to `main` or manual workflow dispatch:

1. Checkout the repository.
2. Set up Node 24 with npm caching.
3. Run `npm ci`.
4. Run `npm run build`.
5. Upload `dist`.
6. Deploy through GitHub Pages.

Vite is configured with `base: './'`, which supports static hosting from GitHub Pages.

## Known Limitations

- There is no automated test script or test suite in the current repository.
- `npm run lint` depends on installed dependencies; if it reports `tsc: command not found`, run `npm install` first.
- The app stores sensitive portfolio data in browser storage unless you export or sync it elsewhere.
- The Google Apps Script endpoint is user-supplied and is not validated by this repo.
- Tax rules can change; verify RMF and ThaiESG rules independently before using unlock dates for decisions.
