# Copilot instructions for talentlink-app

These instructions help AI coding agents work productively in this Angular 20 + Tailwind project. Keep changes aligned with the patterns below and reference the noted files when adding features.

## Big picture

- Angular 20 with standalone components (no NgModules) and lazy-loaded feature routes.
  - App bootstrap: `src/main.ts` bootstraps `App` with `appConfig`.
  - Routing entry: `src/app/app.routes.ts` defines top-level routes. Admin portal is lazy-loaded from `src/app/admin.routes.ts` via `loadChildren`.
- Layout pattern: `AdminLayoutComponent` (`src/app/layouts/admin-layout/*`) wraps a persistent sidebar (`AdminSidebarComponent`) and a `<router-outlet>` for feature pages.
  - Sidebar collapses via `@Output() sidebarToggled` → `AdminLayoutComponent` toggles `[class.ml-*]` on the main content.
- Styling: TailwindCSS v4 via PostCSS. Global styles live in `src/styles.css` and apply font + utility layers. Tailwind config in `tailwind.config.js` scans `./src/**/*.{html,ts}`.
- Data/state: current pages use local component state and mock data; no global store or backend API layer yet.

## Developer workflows

- Dev server: `npm start` (CLI: `ng serve`) → http://localhost:4200
- Build: `npm run build` (CLI: `ng build`) → outputs to `dist/`
- Watch build: `npm run watch`
- Unit tests: `npm test` (Karma/Jasmine via `@angular/build:karma`)
- Scaffolding: `ng generate component feature/your-component` (uses standalone components by default in Angular 20)

## Routing and feature boundaries

- Top-level routes: define in `src/app/app.routes.ts`. Prefer lazy loading by file for feature areas:
  - Example (already used): `{ path: 'admin', loadChildren: () => import('./admin.routes').then(m => m.routes) }`
- Admin feature routes: edit `src/app/admin.routes.ts`.
  - Children render inside `AdminLayoutComponent` via nested `<router-outlet>`.
  - Example child route entries:
    - `{ path: 'jobs', component: JobManagementComponent }`
    - `{ path: 'courses/create', component: CourseBuilderComponent }`

## Components and conventions

- Use standalone components with explicit `imports: []` (see `App`, `AdminLayoutComponent`, `AdminSidebarComponent`).
- Keep new admin pages under `src/app/pages/<feature>/<feature>.component.*`.
- Layout → feature flow:
  - Layout template hosts `<app-admin-sidebar>` and `<router-outlet>`.
  - Sidebar emits collapse events; layout adjusts content margins via Tailwind classes.
- Styles:
  - Project uses both `styleUrl` and `styleUrls` in `@Component` metadata; match the existing style of the edited/nearby file.
  - Prefer utility-first Tailwind. Reusable utility groups belong in `src/styles.css` under `@layer components` (e.g., `.active-nav`).

## Forms, navigation, and data

- Template-driven forms use `FormsModule` in standalone components (e.g., `JobFormComponent`).
- Navigation via `Router` (e.g., `this.router.navigate(['admin/jobs/edit', id])`).
- Component-local mock data is common in current pages (no HTTP services yet). If adding data access, keep it injectable and feature-scoped.

## Testing

- Karma/Jasmine is configured in `angular.json` with polyfills `zone.js` and `zone.js/testing`.
- Place specs next to components (see existing specs under `src/app/pages/**`). Keep tests focused on component inputs/outputs and template behavior.

## Styling/tooling specifics

- Global styles: `src/styles.css` imports Google Fonts (Nunito) and Tailwind layers via `@tailwind base/components/utilities`.
- PostCSS integrates Tailwind: see `postcss.config.js`.
- Prettier is configured with `printWidth: 100` and Angular HTML parser; keep template formatting consistent.

## Examples to follow

- Layout/Sidebar communication: `src/app/layouts/admin-layout/admin-layout.component.*` and `src/app/components/admin-sidebar/admin-sidebar.component.*`.
- Page patterns:
  - Jobs list + actions: `src/app/pages/job-management/job-management.component.*`
  - Job form + validation: `src/app/pages/job-form/job-form.component.*`
  - Courses library and builder: `src/app/pages/course-library/*`, `src/app/pages/course-builder/*`

If anything here seems off or you’re adding a new cross-cutting capability (state, API layer), ask for alignment on structure (service location, DI scope, and routing strategy) before large changes.
