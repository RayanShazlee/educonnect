## EduConnect

Retro-styled educational platform built with Next.js 14 and TypeScript. It includes UI for a news feed, communities, courses, achievements, and a resume builder, using Tailwind CSS and modern React patterns. A Prisma schema is provided to connect a PostgreSQL database when needed.

This README covers setup, local development, project structure, and the technologies used in this repository.

## Requirements

- Node.js 18.17+ (Next.js 14 requirement)
- npm (or another package manager)
- Optional (for database usage): PostgreSQL and a `DATABASE_URL` environment variable

## Quick Start

1) Install dependencies

```bash
npm install
```

2) (Optional) Configure the database (Prisma + PostgreSQL)

- Create a `.env` file in the project root and set `DATABASE_URL`:

```bash
cp .env.example .env  # if present, or create .env manually
```

Add (example):

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DBNAME?schema=public"
```

- Sync schema to the database and generate the Prisma client:

```bash
npx prisma db push
npx prisma generate
```

Note: The application UI works with local/mock data. Database setup is only required if you plan to back features with a live database.

3) Run the development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

4) Production build

```bash
npm run build
npm start
```

## Scripts

- `npm run dev` – Start Next.js in development mode
- `npm run build` – Create an optimized production build
- `npm start` – Start the production server
- `npm run lint` – Run ESLint

## Tech Stack

- Framework: Next.js 14 (App Router), React 18, TypeScript
- Styling: Tailwind CSS, Radix UI primitives, `lucide-react` icons
- Animations: Framer Motion
- Forms & Validation: React Hook Form, Zod
- State: Zustand (lightweight client state), simple custom hooks
- Data Layer: Prisma ORM + PostgreSQL (schema included; usage optional)

## Project Structure

```
eslint.config.mjs
next-env.d.ts
next.config.js
package.json
postcss.config.js
tailwind.config.js / tailwind.config.ts
tsconfig.json
prisma/
	schema.prisma
public/
	*.svg
src/
	app/
		layout.tsx, globals.css, metadata.ts, page.tsx
		achievements/, communities/, courses/, dashboard/, news-feed/, profile/,
		resume/, settings/, sign-in/, sign-up/, wishlist/
	components/
		header, footer, nav, dialogs/, news-feed/, resume/, ui/
	hooks/
	lib/
		auth-context.tsx, mock-data.ts, types.ts, utils.ts, validations.ts
```

Highlights:
- `src/app/**` – App Router pages and route groups
- `src/components/**` – Reusable UI (cards, dialogs, retro UI icons and effects)
- `src/hooks/**` – Common hooks (debounce, async state, local storage, toasts)
- `src/lib/**` – Contexts, mock data, utilities, and type definitions
- `prisma/schema.prisma` – PostgreSQL schema for users, posts, communities, resumes, etc.

## Notable Routes (UI)

- `/` – Home (hero, quick stats, featured sections, platform highlights)
- `/news-feed` – News feed UI (posts, filters, trending)
- `/communities` and `/communities/[id]` – Community listing and detail UI
- `/courses` and `/courses/[id]` – Course listing and detail UI
- `/achievements` – Achievements showcase UI
- `/resume` – Resume dashboard UI
- `/resume/[id]/edit` – Resume editing UI with live preview
- `/profile`, `/dashboard`, `/wishlist`, `/settings` – Additional sections UI
- `/sign-in`, `/sign-up` – Authentication pages (UI)

These routes are implemented as UI screens; some use in-memory/mock data. Connect them to a database and auth provider to persist data.

## Styling & UI

- Tailwind CSS with a retro-styled design system
- Reusable UI primitives in `src/components/ui/*` (cards, buttons, dialogs, tabs, etc.)
- Custom retro visuals: section/topic/achievement icons and themed effects

## Database (Optional)

Prisma schema defines the core entities for a future/optional backend:

- User, Post, Comment, Community, CommunityMember, Badge, UserBadge
- Resource, Message
- Resume, Education, WorkExperience

If you choose to use the database:
- Set `DATABASE_URL` in `.env`
- Run `npx prisma db push` and `npx prisma generate`
- Use the generated client from `src/generated/prisma`

No seed script is included.

## Configuration

- `next.config.js` – Default Next.js configuration
- ESLint and TypeScript are configured; run `npm run lint` locally
- Tailwind is set up via `postcss.config.js` and `tailwind.config.*`

## Development Tips

- Keep Client Components minimal; prefer Server Components where possible
- Use Suspense boundaries for better perceived performance on data-heavy sections
- Validate forms with Zod + React Hook Form for consistent UX

## Troubleshooting

- Node version: Ensure Node.js ≥ 18.17
- Port in use: Set `PORT=3001` (or another value) before `npm run dev` if 3000 is occupied
- Prisma: Database setup is optional; UI works with mock data. If you enable DB, ensure `DATABASE_URL` is valid and the database is reachable

## License

No license file is provided in this repository.
