# vEngine

An open source starter kit specifically tuned for vibe coding and compatibility with the #vibejam 2025 guidelines. vEngine provides a foundation for creating immersive multiplayer experiences with a focus on vibes and real-time interaction.

https://github.com/user-attachments/assets/9e5b7f2f-d578-437c-a694-1aa7cc79232d

🌐 [GitHub Repository](https://github.com/benallfree/vengine)

## Features

- Vibe-optimized architecture
- Real-time multiplayer interaction
- 3D environment with dynamic lighting
- Mobile-friendly controls (touch joysticks)
- Desktop controls (WASD + mouse)
- Player count display
- Connection status indicator
- Next game portal button
- #vibejam 2025 compliant

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

## Contributing

We welcome contributions to vEngine! Whether it's bug fixes, feature additions, or improvements to documentation, your help is appreciated.

Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

### Development Principles

- Use TypeScript
- Early returns
- Function factories over classes
- Format code using `bun run format`

## License

vEngine is open-source software licensed under the MIT license. See the [LICENSE](LICENSE) file for more details.
