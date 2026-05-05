# AGENTS.md

## Commands

| Command | Action |
|---------|--------|
| `pnpm dev` | Start dev server at `localhost:4321` |
| `pnpm build` | Build to `./dist/` |
| `pnpm preview` | Preview production build |
| `pnpm astro check` | Run Astro type checking |

## Tech Stack

- **Framework**: Astro 5.x with React integration
- **Styling**: TailwindCSS v4 (`@tailwindcss/vite` plugin)
- **Package Manager**: pnpm
- **Forms**: React Hook Form + Yup validation
- **UI**: PrimeReact + PrimeIcons

## Project Structure

```
src/
├── pages/      # Astro pages (index.astro, ejemplo-form.astro)
├── components/ # UI components grouped by feature
├── scripts/    # Client-side JS (i18n, smoothScroll, etc.)
├── styles/     # CSS files (global.css, navbar.css)
├── types/      # TypeScript type definitions
├── schemas/    # Yup/Zod validation schemas
└── utils/     # Utility functions
```

## Important Notes

- **SSR**: PrimeReact must stay external (`ssr.noExternal: ['primereact']` in astro.config)
- **Dev Server**: Runs on port 4321
- **No test/lint scripts**: Package.json only defines dev, build, preview commands

## Skills Available

- `.agents/skills/astro/` - Astro framework guidance
- `.agents/skills/tailwind-css-patterns/` - Tailwind patterns
- `.agents/skills/react-best-practices/` - React 19 optimization
- `.agents/skills/accessibility/` - WCAG 2.2 audit guidance
- `.agents/skills/seo/` - Search optimization