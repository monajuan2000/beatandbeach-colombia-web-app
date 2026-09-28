# Beat & Beach Colombia

Tourism and events web app showcasing curated experiences in Medellín, Cali, Cartagena, and Guatapé.

Built with React 19, TypeScript, Vite, and React Router (`HashRouter`, for GitHub Pages).

## Scripts

| Command | Description |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the dev server at `http://localhost:5173/beatandbeach-colombia-web-app/` |
| `npm run build` | Type-check and build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |
| `npm run deploy` | Build and publish `dist/` to GitHub Pages |

## Project structure

```
src/
├── app/                 # App root: providers and routes
├── assets/images/       # Images grouped by domain (brand, cities, destinations, events)
├── components/          # Shared, domain-agnostic building blocks
│   ├── layout/          # Page chrome (SiteHeader)
│   ├── routing/         # Router helpers (ScrollManager)
│   └── ui/              # Reusable UI (Badge, Chip, FilterChips, Modal, SectionHeader)
├── features/            # Domain modules
│   ├── cities/          # components/, data/, types.ts
│   ├── events/          # components/, data/, types.ts
│   ├── home/            # Home page sections, data/, types.ts
│   └── trip/            # Saved events + trip planner (context/, components/)
├── i18n/                # Language support: config, provider, LanguageSwitcher, shared copy
├── pages/               # Route-level screens (HomePage, CityPage)
├── styles/              # global.css (base/reset) and shared.css (buttons, tags, rows)
└── main.tsx             # Entry point
```

## Conventions

- **English only**: file names, folders, components, identifiers, CSS classes, asset names, and data ids.
- **One component per folder**: `ComponentName/ComponentName.tsx` with its styles in `ComponentName/ComponentName.css`, imported by the component itself.
- **PascalCase** for component files and folders; **camelCase** for data/helper modules; **kebab-case** for assets and CSS classes.
- **Feature first**: code that belongs to one domain lives in `features/<domain>/`; only truly shared pieces go in `components/` or `styles/`.
- **`@/` alias** points to `src/` — prefer it over deep relative paths across features.
- **No hardcoded UI text**: every string a visitor can see (including `aria-label` and `alt`) comes from the i18n layer — see below.
- **In-page navigation**: because `HashRouter` owns the URL hash, link to sections with `<Link to="/" state={{ scrollTo: 'section-id' }}>` instead of `href="#section-id"`.

## Internationalization (English / Spanish)

The visitor switches language with the **EN | ES** control in the header. The choice is remembered in `localStorage`; on a first visit the browser language decides. Code stays in English — only what the visitor sees is translated.

Two kinds of text, two mechanisms:

| Kind | Where it lives | How to read it |
| --- | --- | --- |
| **UI copy** (buttons, headings, labels) | `features/<feature>/i18n/en.ts` + `es.ts` (shared copy in `i18n/locales/`) | `const { t } = useTranslation()` → `t.events.details.addToTrip` |
| **Content** (cities, events, projects…) | Each text field in `data/` is a `LocalizedText`: `{ en: '…', es: '…' }` | `const { localize } = useTranslation()` → `localize(event.title)` |

- `en.ts` is the source of truth; `es.ts` is typed against it, so **a missing or extra Spanish key fails the build**.
- Copy that depends on values is a function: `t.cities.page.title(city.name)`.
- Stable ids (e.g. event categories, trip interests) are stored in data; their labels live in the dictionaries.
- To add a new feature's copy: create `features/<feature>/i18n/{en,es}.ts` and register both in `src/i18n/messages.ts`.
- To add a language: add it to `LANGUAGES` / `LANGUAGE_DETAILS` in `src/i18n/config.ts`, then TypeScript will point at every dictionary and `LocalizedText` that needs the new translation.
