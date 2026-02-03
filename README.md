# Immersive Scroll

Interactive demo showcasing a scroll-synced 3D headphones/headset scene built with Vite + React + TypeScript and @react-three/fiber.

Author: Hasina

## Quick start

1. Install dependencies

```bash
npm install
```

2. Start local dev server

```bash
npm run dev
```

3. Open the URL printed by Vite (e.g. http://localhost:8081/) in your browser

## Notes for developers

- This project uses `@react-three/fiber` and `@react-three/drei` for 3D rendering.
- The 3D headset scene is implemented in `src/components/Scene3D.tsx` — tune lights, post-processing and scroll synchronization there.
- To add post-processing (bloom, vignette, chromatic effects) you can use `@react-three/postprocessing`.

If you need help implementing a specific visual effect, open an issue or ask for guidance in this repository.
