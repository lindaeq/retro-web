# linda qi — portfolio site

A one-screen "little computer" desktop built with Next.js (App Router) + TypeScript. No page scroll: the whole site lives inside the computer. Click the files on the left (or the camera keys / menubar) and they open in the beige monitor's window. The widgets on the right can be dragged around, but only inside their own zone.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Where everything lives

```
src/
  app/
    layout.tsx        → loads fonts (Righteous, VT323, Silkscreen, Courier Prime) via next/font
    page.tsx          → renders <Desk />
    globals.css       → all the desk styling (palette, monitor, window, animations)
  components/
    Desk.tsx          → page shell: which screen is open + the shutter flash
    Nav.tsx           → menubar + camera plate (dial, LINDA plate, file keys, shutter)
    FileIcons.tsx     → left-hand file icons (about.txt, projects, ...)
    Monitor.tsx       → the beige monitor + finder-style window; picks the screen to show
    About.tsx         → typing tagline + the "say hello" popup
    Projects.tsx      → project data + grid        (card: ProjectCard.tsx)
    Experience.tsx    → experience data + timeline (each entry has a banner photo)
    Resume.tsx        → resume.pdf viewer
    Design.tsx        → design data + hobbies
    Misc.tsx          → music page (Spotify embed + 8-bit mixtape)
    Contact.tsx       → links
    DeskWidgets.tsx   → draggable right-hand items (This PC, music CD, liner notes, mini player, sticky note)
    MusicPlayer.tsx   → LCD, buttons, track list (used by Misc + the mini player)
    Equalizer.tsx     → bouncing level meter
  hooks/
    useChiptune.ts    → web-audio chiptune player (3 generated tracks) + camera shutter click
    useDragItems.ts   → drag + clamp logic for the right-hand widgets
  lib/
    desk.ts           → screen ids, titles, nav order, contact links
    sx.ts             → tiny helper: sx("display:flex;gap:8px") → React style object
public/               → project / design images, resume.pdf, about-photo.png
```

## Editing content

- **Projects / designs / experience:** edit the arrays at the top of `Projects.tsx`, `Design.tsx` and `Experience.tsx`. Put images in `public/` and set `image: "file-name.png"`. A missing image shows a dotted placeholder; for experience that placeholder carries a `[PHOTO]` tag.
- **Contact links:** `LINKS` in `src/lib/desk.ts` (used by About + Contact).
- **Screen order:** `KEYS`, `MENU`, `FILE_ICONS` and `DIAL` in `src/lib/desk.ts`. The left icons, camera keys and menubar all follow the same order.
- **Songs:** `TRACKS` in `src/hooks/useChiptune.ts` (name, tempo, waveform, notes).
- **Colors:** CSS in `globals.css`; the same palette is in `tailwind.config.ts` (`bg-cream`, `text-ink`, ...).

## Placeholders still to fill in

Anything in `[BRACKETS]` is a placeholder: song names, the design descriptions for merivale volleyball and 8729 pins, the duolingo language, the email link in `LINKS`, and the empty "project four" / experience entries.
