# Linda Qi — Personal Portfolio

An interactive, single-screen retro desktop portfolio built with **Next.js (App Router)** and **TypeScript**. Designed to fit entirely within a single viewport without page scrolling, the interface mimics a vintage desktop computer complete with a camera-inspired navigation bar, Finder-style monitor windows, Web Audio chiptune playback, and draggable desktop widgets.

**Live Demo:** `[Add live URL here]`

---

## Features

* **Single-Screen Desktop OS:** Zero-scroll layout where clicking desktop file icons, camera keys, or top menubar items dynamically renders content inside a beige monitor window.
* **Camera Plate Navigation:** Custom navigation bar featuring a mode dial, nameplate, quick-access file keys, and a shutter button with audio/visual flash feedback.
* **Draggable Desk Widgets:** Interactive right-hand desk zone (This PC, music CD, liner notes, mini player, sticky note) powered by custom boundary-clamped drag physics.
* **Built-in Web Audio Synth & Music Player:** Custom `useChiptune` hook that synthesizes 8-bit tracks directly in the browser via the Web Audio API, alongside MP3 playback support, an animated equalizer, and an embedded Spotify player.
* **Modular Content Architecture:** Portfolio sections (About, Projects, Experience, Resume, Design, Misc, Contact) are driven by typed data arrays for straightforward updates.

---

## Tech Stack

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS + Custom CSS (`globals.css` & inline style utility `sx`)
* **Typography:** `next/font` (`Righteous`, `VT323`, `Silkscreen`, `Courier Prime`)
* **Audio:** Web Audio API (custom chiptune synthesizer + shutter SFX)

---

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com
   cd your-repo-name
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```text
src/
├── app/
│   ├── layout.tsx        # Loads Google Fonts (Righteous, VT323, Silkscreen, Courier Prime)
│   ├── page.tsx          # Entry point rendering <Desk />
│   └── globals.css       # Retro desktop palette, monitor bezel, window & animation styles
├── components/
│   ├── Desk.tsx          # Main viewport shell, active screen state & shutter flash effect
│   ├── Nav.tsx           # Top menubar + camera plate (dial, LINDA plate, file keys, shutter)
│   ├── FileIcons.tsx     # Left-hand clickable desktop icons (about.txt, projects, etc.)
│   ├── Monitor.tsx       # Beige monitor frame & Finder-style window router
│   ├── About.tsx         # Typing tagline animation + "say hello" modal
│   ├── Projects.tsx      # Project data array & grid layout (renders ProjectCard.tsx)
│   ├── Experience.tsx    # Experience data & timeline with banner photos
│   ├── Resume.tsx        # Embedded resume.pdf viewer
│   ├── Design.tsx        # Design showcase & hobbies
│   ├── Misc.tsx          # Music hub (Spotify embed + 8-bit mixtape)
│   ├── Contact.tsx       # Social & contact links
│   ├── DeskWidgets.tsx   # Draggable right-zone items (CD, sticky note, mini player, etc.)
│   ├── MusicPlayer.tsx   # LCD display, playback controls & tracklist
│   └── Equalizer.tsx     # Animated audio level meter
├── hooks/
│   ├── useChiptune.ts    # Web Audio API chiptune generator + camera shutter click SFX
│   └── useDragItems.ts   # Pointer drag & viewport-zone clamping logic for widgets
└── lib/
    ├── desk.ts           # Screen IDs, window titles, navigation order & contact links
    └── sx.ts             # Helper converting CSS strings into React style objects
public/                   # Static assets: project/design images, resume.pdf, about-photo.png
```

---

## Customization Guide

* **Projects, Designs & Experience:** Update the data arrays at the top of `Projects.tsx`, `Design.tsx`, and `Experience.tsx`. Place images in `public/` and reference them via `image: "file-name.png"`. Missing images fall back to a dotted placeholder (tagged `[PHOTO]` in Experience).
* **Navigation & Contact Links:** Edit `LINKS`, `KEYS`, `MENU`, `FILE_ICONS`, and `DIAL` in `src/lib/desk.ts` to reorder screens or update social URLs.
* **Audio & Mixtape Tracks:** Configure `TRACKS` in `src/hooks/useChiptune.ts`. Tracks without a `file` property automatically synthesize 8-bit chiptunes; to use custom audio, drop an `.mp3` into `public/music/` and add `file: "/music/your-song.mp3"`. Update the Spotify embed ID directly in `src/components/Misc.tsx`.
* **Theme & Colors:** Customize color tokens in `src/app/globals.css` and `tailwind.config.ts` (`bg-cream`, `text-ink`, etc.).

---

## Content Checklist

Items marked with `[BRACKETS]` in the codebase are placeholders ready to be replaced before deployment:
- [ ] Custom song names in `useChiptune.ts`
- [ ] Duolingo language entry
- [ ] Email address in `LINKS` (`src/lib/desk.ts`)
- [ ] Placeholder entries for `"project four"`, `"design four"`, and Experience items
