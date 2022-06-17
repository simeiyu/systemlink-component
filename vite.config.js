import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue()],
  server: {
    port: 3006,
    proxy: {
      '/integration': {
        changeOrigin: true,
        target: 'http://47.102.131.179:18086/'
      },
      '/spContext': {
        changeOrigin: true,
        target: 'http://localhost:3002/'
      }
    }
  }
})
