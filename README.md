# Sable — AI Meeting Intelligence Platform

Sable turns meeting transcripts into searchable, actionable knowledge. It automatically generates summaries, tracks action items, and lets you ask questions about any past meeting.

Live demo: https://vercel.com/hafsa-siddiqas-projects/sable

## Problem

Teams lose decisions and commitments buried in meeting transcripts. Sable turns a transcript into a clear summary, trackable action items, and a searchable meeting history.

## Tech Stack

Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, Lucide icons. Planned: Framer Motion, TanStack Query, Zustand, React Hook Form, Zod, NextAuth.js, Prisma, PostgreSQL.

## Features (current)

- Dashboard overview with stat cards and recent meetings
- Meetings list with clickable cards linking to a detail view
- Meeting detail page with transcript and tabbed AI panel (Summary, Action Items, Ask AI)
- Action Items kanban board (To Do, In Progress, Done)
- Settings page with profile form
- Fully responsive with a mobile drawer navigation
- Marketing landing page with pricing tiers and feature highlights

## Features (in progress)

- Authentication (NextAuth.js)
- Real AI-powered summaries and Q&A with streaming responses
- PostgreSQL database via Prisma, replacing current mock data
- Dark mode toggle
- Automated tests

## Folder Structure

    src/
      app/
        (marketing)/       -> public landing page, served at "/"
        (dashboard)/        -> authenticated app shell
          dashboard/         -> overview page, served at "/dashboard"
          meetings/           -> meetings list + "/meetings/[id]" detail page
          actions/            -> action items kanban
          settings/           -> account settings
        layout.tsx          -> root layout
        globals.css         -> Tailwind + theme CSS variables
      components/
        ui/                 -> shadcn/ui primitives (Button, Card, Tabs, Sheet, etc.)
      lib/
        utils.ts            -> shared utility functions

## Local Setup

    git clone https://github.com/YOUR_USERNAME/sable.git
    cd sable
    npm install
    npm run dev

Visit http://localhost:3000

## Build

    npm run build

## Roadmap

- [ ] Deploy to Vercel
- [ ] Auth (NextAuth.js)
- [ ] Real AI backend for summaries and Ask AI with streaming
- [ ] PostgreSQL + Prisma
- [ ] Dark mode
- [ ] Test suite (Vitest + Playwright)
- [ ] Semantic search across meetings
- [ ] Team/workspace roles

## Author

Built as part of a self-directed portfolio project demonstrating production-level frontend engineering practices.
