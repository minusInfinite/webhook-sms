import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    server: {
      proxy: {
        "/graphql": "http://localhost:3001"
      }
    },
    plugins: [react()]
  }
})
