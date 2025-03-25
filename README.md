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
- Splash screen with loading progress
- Vibescale™ measurement and tracking
- MMO position synchronization
- Configurable camera modes:
  - Third-person perspective
  - First-person perspective
- Portal system:
  - Entry portals
  - Exit portals
- #vibejam 2025 compliant

## VibeJam 2025 Compatibility

vEngine is fully compliant with #vibejam 2025 requirements:

- 🤖 100% AI-authored source code
- 🌐 Instant web access - no login, no signup, free-to-play
- 🚀 Ready for fly.io deployment (your-domain.fly.dev)
- 👥 Built-in multiplayer functionality
- 🎮 ThreeJS-powered 3D engine
- ⚡ Zero loading screens or heavy downloads - instant play

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

### Key Architectural Decisions

#### React Strict Mode

The application runs in React's Strict Mode (`<React.StrictMode>`), which:

- Helps identify potential problems in the application
- Double-invokes component functions in development to surface side-effect issues
- Prepares code for future React features like concurrent rendering
- Warns about deprecated APIs and patterns

#### Three.js Model Management

The Entity component uses a `getState` pattern for performance optimization:

```typescript
interface EntityProps {
  getState?: () => EntityState
  // ...
}
```

This pattern prevents unnecessary recreation of Three.js models by:

- Allowing external state management (e.g., physics, game logic) without component re-renders
- Using `useFrame` to efficiently sync position/rotation updates
- Maintaining a stable reference to Three.js objects across renders
- Reducing garbage collection overhead from vector/matrix calculations

#### State Management with Valtio

vEngine uses Valtio for state management instead of Context or other React state solutions because:

- It provides proxy-based reactivity that's perfect for game state
- Allows direct mutations which feels more natural for game logic
- Has special handling for Three.js objects via `ref()` to prevent proxy-related issues
- Minimal boilerplate compared to Redux or Context
- Great TypeScript support with automatic type inference
- Better performance than Context for frequently updating game state

#### CSS-in-TypeScript with Vanilla Extract

The project uses Vanilla Extract for styling because:

- Full TypeScript integration with zero-runtime CSS-in-TS
- All styles are compiled to static CSS at build time
- Provides CSS Modules-like scoping by default
- Enables theme tokens and type-safe design systems
- Allows sharing constants between TS and CSS
- Better IDE support with go-to-definition and refactoring

## License

vEngine is open-source software licensed under the MIT license. See the [LICENSE](LICENSE) file for more details.
