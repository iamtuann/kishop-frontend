// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  app: {
    head: {
      title: 'KiShop',
      meta: [
        {name: 'description', content: 'KiShop best sneakers'}
      ],
      link: [
        { 
          rel: "stylesheet",
          href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200'
        },
        { 
          rel: "preconnect",
          href: 'https://fonts.googleapis.com'
        },
        { 
          rel: "preconnect",
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600;700;800&display=swap'
        },
      ]
    }
  },
  css: [
    '@/assets/css/app.css',
  ],
})
