# Vibe Portal

A 3D multiplayer experience built with React Three Fiber and Socket.IO.

## Features

- Real-time multiplayer interaction
- 3D environment with dynamic lighting
- Mobile-friendly controls (touch joysticks)
- Desktop controls (WASD + mouse)
- Player count display
- Connection status indicator
- Next game portal button

## Tech Stack

- React + TypeScript
- Three.js with React Three Fiber
- Socket.IO for real-time communication
- Vanilla Extract for CSS-in-TS
- Vite for development and building
- Express.js backend
- Bun for package management and runtime

## Development

1. Install dependencies:

```bash
bun install
```

2. Start the development server:

```bash
bun run dev
```

This will start both the Vite development server and the Socket.IO backend server concurrently.

## Production

1. Build the frontend:

```bash
bun run build
```

2. Start the production server:

```bash
NODE_ENV=production bun run server/index.ts
```

The server will serve the static files from the `dist` directory and handle Socket.IO connections.

## Project Structure

- `/src` - Frontend source code
  - `/components` - React components
  - `/styles` - Vanilla Extract CSS files
- `/server` - Backend source code
- `/public` - Static assets

## Environment Variables

- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment mode (development/production)
