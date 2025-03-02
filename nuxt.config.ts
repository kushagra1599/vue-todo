// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  ssr: false,
  
  // Configure the app for GitHub Pages
  app: {
    // Replace 'your-repo-name' with your actual repository name
    baseURL: '/vue-todo/',
    // This helps with resource loading
    buildAssetsDir: '/_nuxt/'
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  plugins: [
    '~/plugins/localStorage'
  ],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  app:{
    head:{
      link:[
        {
          href:'https://fonts.googleapis.com',
          rel:'preconnect'
        },
        {
          href:'https://fonts.gstatic.com',
          rel:'preconnect'
        },
        {
          href:'https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap',
          rel:'stylesheet'
        }
      ]
    },
  },
  modules: [
    '@pinia/nuxt',
  ],
  pinia:{
    storeDirs:['./stores/**']
  },
  nitro:{
    preset:'github-pages'
  }
})

