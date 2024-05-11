import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // ... Specify options here.
    environment:'jsdom',
    globals: true,
    mockReset: true,
    setupFiles: ['./tests/setupTests.ts']
  },
})
