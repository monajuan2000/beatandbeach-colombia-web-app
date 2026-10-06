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

## Local API integration

The Vite development server proxies `/api` requests to Spring Boot at `http://localhost:8080` by default. Set `VITE_API_PROXY_TARGET` in `.env` to override the backend URL. The optional backend email sender can be tested locally with the API's Mailpit Compose setup; messages appear at `http://localhost:8025` instead of being sent to real recipients.

For GitHub Pages, the optional backend sender requires `VITE_API_BASE_URL` to be set to the HTTPS origin of the deployed API. For example: `VITE_API_BASE_URL=https://api.example.com npm run deploy`. The API must allow the GitHub Pages origin `https://monajuan2000.github.io` through `CORS_ALLOWED_ORIGINS`.

The Guatapé quote is available for the one-day and SENA special plans; two- and three-day plans remain disabled. Itinerary email requests use EmailJS by default, sending the localized itinerary and cost summary to `monajuan236@gmail.com` with a copy to the customer's captured email. Set `VITE_ITINERARY_EMAIL_PROVIDER=formsubmit` to select FormSubmit instead; if unset or set to another value, EmailJS is used. The FormSubmit sender remains isolated from the survey.

Set `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and `VITE_EMAILJS_PUBLIC_KEY` in `.env` for local development and in the production build environment. Configure the EmailJS template's To Email as `{{to_email}}`, CC Email as `{{cc_email}}`, Reply-To as `{{reply_to}}`, Subject as `{{subject}}`, and body as `{{{message_html}}}`. Dynamic CC may require an EmailJS plan that supports CC recipients. The HTML body includes the logo from `public/beat-and-beach-logo.png`; deploy the site before sending production emails so that image URL is publicly reachable. The PDF is available separately for download and WhatsApp; it is not attached to this email flow.

After submission, the modal shows a success or error message naming the active provider. Success means the provider accepted the request; it does not confirm inbox delivery. FormSubmit rate-limit responses (`429`) receive a specific message. The survey continues using its existing FormSubmit flow. The API-based sender remains available in `src/features/itineraries/services/sendQuoteEmailApi.ts` for future backend use.

FormSubmit diagnostics for survey JSON submissions are enabled in development. On the deployed site, set `sessionStorage.debugFormSubmit` to `true` in the browser console to enable diagnostics for the current session.

## Project structure

```
src/
├── app/                 # App root: providers and routes
├── assets/images/       # Images grouped by domain (brand, cities, destinations, events)
├── config/              # App-wide constants (external links)
├── components/          # Shared, domain-agnostic building blocks
│   ├── layout/          # Page chrome (SiteHeader)
│   ├── routing/         # Router helpers (ScrollManager)
│   └── ui/              # Reusable UI (Badge, Chip, FilterChips, Modal, SectionHeader)
├── features/            # Domain modules
│   ├── cities/          # components/, data/, types.ts
│   ├── events/          # components/, data/, types.ts
│   ├── home/            # Home page sections, data/, types.ts
│   ├── itineraries/     # City plans, cost summaries, quote/PDF flow, and email services
│   ├── survey/          # Research surveys: data/, components/, utils/ (validation, email payload), config.ts
│   └── trip/            # Saved events + trip planner (context/, components/)
├── hooks/               # Reusable React hooks (useInView for scroll reveals)
├── i18n/                # Language support: config, provider, LanguageSwitcher, shared copy
├── pages/               # Route-level screens (HomePage, CityPage, SurveyPage)
├── styles/              # tokens.css (color variables, light surface), global.css (base), shared.css (buttons, tags, rows)
├── utils/               # Small shared helpers (scroll-reveal stagger, card numbers)
└── main.tsx             # Entry point
```

## Conventions

- **English only**: file names, folders, components, identifiers, CSS classes, asset names, and data ids.
- **One component per folder**: `ComponentName/ComponentName.tsx` with its styles in `ComponentName/ComponentName.css`, imported by the component itself.
- **PascalCase** for component files and folders; **camelCase** for data/helper modules; **kebab-case** for assets and CSS classes.
- **Feature first**: code that belongs to one domain lives in `features/<domain>/`; only truly shared pieces go in `components/` or `styles/`.
- **`@/` alias** points to `src/` — prefer it over deep relative paths across features.
- **Accent styles for light sections**: use `SectionHeader variant="accent"` (or the `eyebrow-pill` / `accent-heading` classes), `accent-card` + `card-number` for cards, and `reveal-group` / `reveal-item` with `useInView` + `revealDelay()` for scroll reveals — all in `styles/shared.css`.
- **Color tokens**: read colors from the CSS variables in `styles/tokens.css` (`var(--color-text)`, `var(--color-surface)`…) instead of hardcoding them. Add the `surface-light` class to a section or card to switch it to the warm "sand" palette; `surface-band` turns a group of home sections into a rounded light panel.
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

## Surveys

Research surveys live in `features/survey/`. Each survey is data (`data/<name>.ts`, registered in `data/surveys.ts`) with bilingual questions typed as `single`, `multiple`, `likert` or `text`; a city page shows its survey callout automatically through `getSurveyForCity`. Responses are always emailed in Spanish via FormSubmit (`features/survey/config.ts`); the first submission triggers an activation email to the destination address.
