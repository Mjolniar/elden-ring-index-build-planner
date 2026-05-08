import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Use relative asset paths in production so the build works when loaded from
  // Electron's file:// protocol. The dev server is unaffected.
  base: command === 'build' ? './' : '/',
  test: {
    environment: 'node',
  },
}))
