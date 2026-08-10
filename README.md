<div align="center">
  <img src="public/posters/The_Batman.jpg" alt="A Journey To  Tomorrow" width="480" />
</div>

<div align="center">

# A Journey To  Tomorrow

*A complete DC watch-order tracker and countdown experience, spanning every DC universe from Creature Commandos onward.*

![Astro](https://img.shields.io/badge/Astro-BC52EE?style=flat-square&logo=astro&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=flat-square&logo=framer&logoColor=blue)

</div>

<br/>

## Table of Contents

- [Overview](#overview)
- [Why This Exists](#why-this-exists)
- [How the Site Is Organized](#how-the-site-is-organized)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Content & Attribution](#content--attribution)

<br/>

## Overview

A Journey To  Tomorrow is a fan-built companion site for tracking every DC film and series across every distinct on-screen continuity — Christopher Nolan's Dark Knight Trilogy, the DC Extended Universe, James Gunn's new DC Universe ("Gods and Monsters"), Matt Reeves' Elseworlds Batman saga, and Todd Phillips' Joker universe — all in one place, with a live countdown to the next confirmed release.

Rather than treating DC as a single unbroken timeline, the site treats it as what it actually is: several separate, non-connected continuities that happen to share the same characters and iconography. Every title carries its release year, its in-universe story year, and the specific universe it belongs to, so viewers can browse a single continuity in isolation or see the full catalogue side by side without conflating universes that were never meant to connect.

## Why This Exists

DC's on-screen history is unusually fragmented compared to other shared universes — a rebooted cinematic universe, an entirely separate detective-noir Batman continuity, a standalone Joker duology, and a completed trilogy that predates all of them. Keeping track of which movie belongs to which continuity, and in what order to watch each one, means piecing together wiki pages and fan threads that rarely agree with each other. A Journey To  Tomorrow consolidates that into a single, up-to-date reference: one timeline, one source of truth, organized by universe first and chronology second.

The project was also built as an excuse to explore how a content-heavy, media-rich catalogue site can stay fast and responsive — background video, dozens of poster images, and a searchable, filterable dataset of every entry, without the site feeling heavy to load or navigate.

## How the Site Is Organized

- **Universes** — every entry grouped by its actual continuity (Nolanverse, DCEU, DCU, Elseworlds, Joker Universe), so unrelated stories are never mixed into one chronology
- **Timeline** — every film and series laid out in sequence, with the option to sort by release order or in-universe story order
- **Chapters** — the catalogue grouped by production era within each universe, for viewers who prefer to browse in structured chunks rather than a single continuous list
- **A Journey To  Tomorrow** — a focused rail spotlighting the current and upcoming slate of James Gunn's DCU, for viewers who only want to catch up on what's immediately relevant

## Features

- **Live countdown** to the next confirmed DC release, updating in real time down to the second
- **Universe filtering** — isolate the Nolanverse, DCEU, DCU, Elseworlds, or Joker Universe independently, each with its own color-coded badge
- **Full catalogue timeline** covering every film and series, sortable by story order or release order
- **Chapter-by-chapter breakdown**, scoped to whichever universe is active
- **Character spotlight carousel** highlighting key figures with quick access to their filmography
- **Grid and timeline views**, so the catalogue can be browsed in whichever layout suits the viewer
- **Search and filter** across titles, release years, and cast
- **Watch-order progress tracking**, stored locally in the browser with no account required
- **Dedicated character pages** with a per-character appearance history across DC

## Tech Stack

The site is built on [Astro](https://astro.build) for static-first performance, with interactive elements implemented as isolated islands in [React](https://react.dev) so that most of the page ships as static markup. Styling is handled entirely with [Tailwind CSS](https://tailwindcss.com), and the motion work — the countdown digits, the universe and chapter tabs, and card transitions — is built with [Framer Motion](https://www.framer.com/motion/).

## Project Structure

```
journeytotomorrow/
├── public/
│   ├── posters/          # Movie and series poster artwork
│   ├── banner/           # Hero and branding imagery
│   ├── bg/                # Background video clips
│   └── favicon assets
├── src/
│   ├── components/        # Astro and React components (hero, timeline, cards, nav, footer)
│   │   ├── App.jsx
│   │   ├── UniverseTabs.jsx   # Universe filter (Nolanverse / DCEU / DCU / Elseworlds / Joker)
│   │   ├── PhaseTabs.jsx      # Chapter filter, scoped to the active universe
│   │   ├── MovieCard.jsx
│   │   └── CharacterTimeline.jsx
│   ├── data/
│   │   ├── movies.json    # The full DC catalogue: titles, years, cast, saga, story order
│   │   ├── universes.js   # Universe metadata — labels and colors for each saga
│   │   └── characters.js  # Character metadata used by the spotlight and character pages
│   ├── hooks/
│   │   └── useWatched.js  # Local-storage-backed watch-progress tracking
│   ├── layouts/           # Shared page layout (head, fonts, footer)
│   ├── pages/
│   │   ├── index.astro          # Home page — hero, universes, timeline, chapters
│   │   ├── privacy-policy.astro
│   │   └── character/[slug].astro  # Dynamic per-character detail pages
│   └── styles/            # Global stylesheet
└── astro.config.mjs
```

The `data/` directory is the single source of truth for the catalogue — every title on the timeline, in the universe filter, and in the chapter breakdown is generated from `movies.json` and `universes.js`, so the ordering and continuity logic lives in one place rather than being duplicated across components.

## Content & Attribution

A Journey To  Tomorrow is an unofficial, non-commercial fan project. It is not affiliated with, endorsed by, or connected to DC Studios or Warner Bros. Discovery. All movie titles, poster artwork, and character names remain the property of their respective copyright holders and are used here solely for identification and reference purposes.

<br/>

<div align="center">

---

**Built by Ayush**

[![Portfolio](https://img.shields.io/badge/Portfolio-ayushcmd.me-e5231b?style=flat-square&logo=googlechrome&logoColor=white)](https://ayushcmd.me)
[![GitHub](https://img.shields.io/badge/GitHub-ayushcmdx-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/ayushcmdx)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-ayushcmd-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/ayushcmd)

</div>