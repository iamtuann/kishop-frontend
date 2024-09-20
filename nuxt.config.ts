// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@samk-dev/nuxt-vcalendar',
  ],
  runtimeConfig: {
    public: {
      BASE_URL: process.env.API_URL || "http://localhost:8081/api",
    }
  },
  hooks: {
    'pages:extend'(pages) {
      pages.push({
        name: 'VariantProduct',
        path: '/products/:slug/:variantId',
        file: '~/pages/products/[slug].vue'
      })
    }
  },
  plugins: [
    '~/plugins/ofetch'
  ],
  typescript: {
    strict: true
  },
  app: {
    head: {
      title: 'KiShop',
      meta: [
        {name: 'description', content: 'KiShop best sneakers'}
      ],
      link: [
        { 
          rel: "preconnect",
          href: 'https://fonts.googleapis.com'
        },
        { 
          rel: "preconnect",
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600;700;800&display=swap'
        },
        { 
          rel: "stylesheet",
          href: 'https://site-assets.fontawesome.com/releases/v6.6.0/css/all.css'
        },
      ]
    }
  },
  css: [
    '@/assets/css/app.css',
    '@/assets/css/tailwind.css'
  ],
})