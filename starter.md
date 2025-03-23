# Vibe Portal - 3D Multiplayer Experience

## Tech Stack

### Frontend

- react
- react-three-fiber
- Three.js
- Vite + TypeScript
- Prettier for code formatting
  - No semicolons
  - ES5 trailing commas
  - Organized imports with custom ordering
  - Configured via `.prettierrc`
  - Available commands:
    - `bun run format` - Format all files
    - `bun run format:check` - Check formatting without modifying files
- vanilla-extract for CSS-in-TS

  - All styles must be in separate `.css.ts` files
  - Component styles should be in `styles/components/ComponentName.css.ts`
  - Global styles in `styles/global.css.ts`
  - Theme variables in `styles/theme.css.ts`
  - Media queries must use raw values, not theme variables

    ```ts
    // ❌ Won't work
    [`(min-width: ${vars.breakpoints.mobile})`]: { ... }

    // ✅ Use raw values instead
    const MOBILE_BREAKPOINT = '768px' // Match theme value
    [`(min-width: ${MOBILE_BREAKPOINT})`]: { ... }
    ```

- nipplejs for mobile controls
- valtio for state management
- Socket.io client for real-time communication

### Backend

- Express.js server
- Socket.io for real-time communication
- Bun for runtime and package management

## Core Features

### Splash Page

- Initial connection screen
- Socket connection status indicator
- Play button (enabled after successful connection)
- Live player count display
- "Next Game" portal button linking to portal.pieter.com

### Main Game

- Three.js scene with rotating sphere
- Game title rendered on sphere surface
- Real-time multiplayer synchronization
- FPS-style movement and camera controls
- Player count HUD element
- Environment
  - Reflective floor grid for depth perception and movement reference
  - Dynamic lighting setup
    - Ambient light for base illumination
    - Point lights for sphere highlights
    - Directional light for shadow casting
    - Soft shadows for realism

### UI Elements

- Player count HUD
- Connection status indicator
- "Next Game" portal button (persistent across all views)
  - Fixed position in top-right corner
  - Links to portal.pieter.com
  - Styled consistently with main UI theme

### Player Representation

- Each player represented by a unique, brightly colored bauble
- Real-time position and rotation updates
- Movement delta threshold for network updates
- Smooth interpolation between position updates
- Player join/leave notifications

### Multiplayer

- MMO-style persistent world
- Position and rotation delta broadcasting
- Network state optimization
  - Update throttling based on movement threshold
  - Position interpolation for smooth movement
  - Local prediction for responsive controls

### Controls

#### Desktop Mode

- WASD keys for movement
- Mouse pointer lock for looking around
- Z-axis rotation locked at 0

#### Mobile Mode

- Left joystick for movement (0.1 tolerance)
- Right joystick for looking (0.1 tolerance)
- Touch-optimized interface

## Networking

### Socket Events

- `player:join` - New player connection
- `player:leave` - Player disconnection
- `player:move` - Position/rotation update (when above threshold)
- `world:stats` - Player count and world state updates

### State Management

- Local player state with immediate updates
- Remote player interpolation
- Movement threshold: Update only when position/rotation delta exceeds tolerance
- World state synchronization
- Player count broadcasting

## Development

```bash
# Install dependencies
bun install

# Update all packages to latest versions
bun update --latest

# Start development environment (concurrent Vite + Server)
bun run dev
```

## Deployment

- Fly.io configuration for 256MB machine
- Dockerfile for production build
- Static content served via Express in production
- Production optimizations enabled

## Architecture Notes

- Mobile-first responsive design
- CSS modules in `.css.ts` files
  - Each component has its own style file in `styles/components/`
  - Global styles in `styles/global.css.ts`
  - Theme variables in `styles/theme.css.ts`
  - No inline styles or style objects in component files
- Socket-based state synchronization
- Production-ready static file serving
- Optimized network updates with delta thresholds
- Interpolated player movement for smooth visuals
