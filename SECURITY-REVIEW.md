# Security review

**Reviewed:** 2026-10-06
**Scope:** Application source, configuration, dependency usage, and the production dependency audit.

## Summary

No exploitable vulnerability was identified in the application source or in the deployed static client. `npm audit` reports six high-severity instances across two advisories in development-only dependency paths. Both advisories describe denial-of-service conditions; neither dependency is part of the production dependency set. `npm audit --omit=dev` reports no production dependency advisories.

| # | Severity | Package and advisory | Evidence | Impact in this project | Confidence |
|---|----------|----------------------|----------|------------------------|------------|
| 1 | 🟠 HIGH (npm advisory) | `braces` — [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) | [`package-lock.json`](./package-lock.json#L1341-L1348) and dependency chain at lines 1823-1835, 2057-2070, 2106-2118, and 2665-2673 | Deeply nested brace patterns can exhaust the stack. It is reached through `gh-pages` and its globbing dependencies, all development/deployment tooling. No attacker-controlled request path in the published client was identified. | 9/10 |
| 2 | 🟠 HIGH (npm advisory) | `source-map-js` — [GHSA-68fv-2mgg-jv7q](https://github.com/advisories/GHSA-68fv-2mgg-jv7q) | [`package-lock.json`](./package-lock.json#L3253-L3260), pulled through the PostCSS/Vite development toolchain at lines 2973-2977 | Crafted indexed source-map offsets can cause event-loop denial of service. The locked package is a development dependency and is not included in the production dependency set. | 9/10 |

The npm severity is retained above for traceability. Given the static deployment model and development-only dependency paths, the practical exposure to users of the public site is low.

## Recommended follow-up

1. Run `npm audit fix` without `--force`, inspect the lockfile diff, and rerun lint/build. The non-forced update can resolve `source-map-js`.
2. Do not accept the suggested forced `gh-pages` downgrade without compatibility testing. Review a compatible `gh-pages` update or a narrowly scoped override to a verified patched `braces` version, then validate the deployment script.
3. Add dependency-audit checks to the regular CI workflow and review advisories during dependency updates.
