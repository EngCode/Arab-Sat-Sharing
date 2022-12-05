import head from './config/head';
import manifest from './config/pwa/manifest';
import icon from './config/pwa/icon';
import meta from './config/pwa/meta';

export default defineNuxtConfig({
  app: { head },

  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@nuxtjs/color-mode',
    '@nuxt/image-edge',
    '@vueuse/nuxt',
    '@nuxtjs/robots',
    '@kevinmarrec/nuxt-pwa',
  ],

  colorMode: { classSuffix: '' },

  image: {
    dir: 'assets/images',
    provider: 'cloudinary',
    cloudinary: {
      baseURL: process.env.CLOUDINARY_BASE_URL,
      modifiers: { format: 'webp', quality: 'auto:best' },
    },
    screens: {
      '4xs': 360,
      '3xs': 400,
      '2xs': 480,
      xs: 560,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1440,
    },
  },

  pwa: { meta, icon, manifest },
});
