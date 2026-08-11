import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/structure-sense/',
  plugins: [react()],
  test: { globals: true, environment: 'jsdom', setupFiles: './src/testSetup.ts' },
})
