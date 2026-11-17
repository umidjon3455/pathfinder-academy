# EduQuest

EduQuest is a web application built with React, TypeScript, Vite, and Supabase.

## Requirements

- Node.js (LTS recommended)
- npm

## Getting started

1. Clone the repository.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a local environment file:

   ```bash
   cp .env.example .env
   ```

   On Windows PowerShell, use `Copy-Item .env.example .env`.

4. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in `.env` using your Supabase project's client configuration.
5. Start the development server:

   ```bash
   npm run dev
   ```

## Available scripts

- `npm run dev` — start the Vite development server.
- `npm run build` — create a production build.
- `npm run lint` — run ESLint.
- `npm run test` — run the Vitest test suite.
- `npm run preview` — preview the production build locally.

## Environment variables

Vite exposes variables prefixed with `VITE_` to browser code. Treat these values as public; never put service-role keys, database passwords, or other server secrets in them. Keep your local `.env` file out of Git.

The Supabase publishable/anon key is intended for client-side use. Protect application data with correctly configured Supabase Row Level Security (RLS) policies.

## Tech stack

- React 18
- TypeScript
- Vite
- Supabase
- Tailwind CSS
