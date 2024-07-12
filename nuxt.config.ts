// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

export default defineNuxtConfig({
  devtools: { enabled: true },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // global scss file
          additionalData: '@use "@/assets/styles/main.scss" as *;'
        }
      }
    },
    plugins: [
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), './assets/svg')]
      })
    ]
  }
});
