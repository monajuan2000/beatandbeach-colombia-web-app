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
- **In-page navigation**: because `HashRouter` owns the URL hash, link to sections with `<Link to="/" state={{ scrollTo: 'section-id' }}>` instead of `href="#section-id"`.
