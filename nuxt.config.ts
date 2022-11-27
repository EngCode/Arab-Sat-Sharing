export default defineNuxtConfig({
  app: {
    head: {
      title: 'Arab Sat Sharing - سات شيرنج العرب',
      htmlAttrs: { lang: 'ar' },
      link: [
        // Favicon
        {
          rel: 'icon',
          href: '/favicon-32x32.png',
          type: 'image/png',
          sizes: '32x32',
        },
        {
          rel: 'apple-touch-icon',
          href: '/favicon-16x16.png',
          sizes: '16x16',
        },
        {
          rel: 'apple-touch-icon',
          href: '/apple-touch-icon.png',
          sizes: '180x180',
        },
        {
          rel: 'mask-icon',
          href: '/safari-pinned-tab.svg',
          color: '#5bbad5',
        },
        {
          rel: 'manifest',
          href: '/site.webmanifest',
        },
        // Fonts
        {
          rel: 'preconnect',
          href: 'https://fonts.bunny.net',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.bunny.net/css?family=tajawal:400,500,700,800',
        },
      ],

      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        // Favicon
        { name: 'msapplication-TileColor', content: '#00aba9' },
        { name: 'theme-color', content: '#ffffff' },
        // Social Cards Meta
        { property: 'fb:app_id', content: '966242223397117' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        {
          property: 'og:url',
          content: 'https://arab-sat-sharing.vercel.app/',
        },
        {
          property: 'twitter:url',
          content: 'https://arab-sat-sharing.vercel.app/',
        },
        {
          property: 'twitter:domain',
          content: 'https://arab-sat-sharing.vercel.app/',
        },
        {
          property: 'og:image',
          content:
            'https://res.cloudinary.com/cloud-m98/image/upload/v1663009658/Portfolio/Website-Screenshot.png',
        },
        {
          property: 'og:image:secure_url',
          content:
            'https://res.cloudinary.com/cloud-m98/image/upload/v1663009658/Portfolio/Website-Screenshot.png',
        },
        {
          property: 'twitter:image',
          content:
            'https://res.cloudinary.com/cloud-m98/image/upload/v1663009658/Portfolio/Website-Screenshot.png',
        },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        {
          name: 'description',
          content:
            'جدول مباريات اليوم مع قنوات الشيرنج الناقلة علي جميع الأقمار',
        },
        {
          property: 'og:description',
          content:
            'جدول مباريات اليوم مع قنوات الشيرنج الناقلة علي جميع الأقمار',
        },
        {
          property: 'twitter:description',
          content:
            'جدول مباريات اليوم مع قنوات الشيرنج الناقلة علي جميع الأقمار',
        },

        {
          property: 'og:title',
          content: 'Arab Sat Sharing - سات شيرنج العرب',
        },
        {
          property: 'og:site_name',
          content: 'Arab Sat Sharing - سات شيرنج العرب',
        },
        {
          property: 'twitter:title',
          content: 'Arab Sat Sharing - سات شيرنج العرب',
        },
        {
          property: 'og:image:alt',
          content: 'Arab Sat Sharing - سات شيرنج العرب',
        },
      ],
    },
  },

  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@nuxtjs/color-mode',
    '@nuxt/image-edge',
    '@vueuse/nuxt',
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
});
