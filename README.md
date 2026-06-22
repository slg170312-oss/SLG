 
# SLG MOTORS

A React replica of the SLG MOTORS industrial motors landing page.

## Developers 
Jai
Claude

## Prerequisites

Install [Node.js](https://nodejs.org/) (v18 or later).

## Getting started

```bash
cd slg-motors
npm install
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

## Project structure

```
src/
├── components/
│   ├── Header.jsx       # Logo + navigation
│   ├── Hero.jsx         # Hero section with CTAs
│   ├── CertBadges.jsx   # ISO / BIS / IE3 badges
│   ├── StatsBar.jsx     # Key statistics row
│   ├── WhyChoose.jsx    # Feature section + grid
│   ├── CTASection.jsx   # Wholesale enquiry banner
│   └── Footer.jsx       # Footer links
├── App.jsx
├── main.jsx
└── index.css            # Global styles
```
