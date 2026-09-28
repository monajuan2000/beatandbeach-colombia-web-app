import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/beatandbeach-colombia-web-app/',
  plugins: [react()],
})
