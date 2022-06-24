import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue()],
  server: {
    port: 3006,
    proxy: {
      '/systemlink': {
        changeOrigin: true,
        target: 'http://sp7.iamzju.com:30080/'
      },
      '/spContext': {
        changeOrigin: true,
        target: 'http://localhost:3002/'
      }
    }
  }
})
