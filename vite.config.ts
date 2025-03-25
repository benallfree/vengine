import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin(),
    visualizer({
      open: true, // Automatically open the bundle report in your browser
      filename: 'dist/stats.html', // Output file
      gzipSize: true, // Show gzipped sizes
      brotliSize: true, // Show brotli sizes
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/socket.io': {
        target: 'http://localhost:3001',
        ws: true,
      },
    },
  },
})
