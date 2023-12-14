const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon-180x180.png',
      maskIcon: 'img/icons/android-chrome-maskable-192x192.png',
      msTileImage: 'img/icons/mstile-150x150.png',
    },
    manifestOptions: {
      name: 'Brand Manager',
      short_name: 'Brand',
      description: 'Multibrand Garment Wholesale Market App',
      start_url: './',
      display: 'standalone',
      background_color: '#ea3941',
      theme_color: '#ea3941',
      orientation: 'portrait',
      icons: [
        {
          src: 'img/icons/apple-touch-icon-60x60.png',
          sizes: '60x60',
          type: 'image/png',
        },
        {
          src: 'img/icons/apple-touch-icon-76x76.png',
          sizes: '76x76',
          type: 'image/png',
        },
        {
          src: 'img/icons/apple-touch-icon-120x120.png',
          sizes: '120x120',
          type: 'image/png',
        }, 
        {
          src: 'img/icons/apple-touch-icon-152x152.png',
          sizes: '152x152',
          type: 'image/png',
        }, 
        {
          src: 'img/icons/apple-touch-icon-180x180.png',
          sizes: '180x180',
          type: 'image/png',
        }, 
        {
          src: 'img/icons/android-chrome-maskable-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        }, 
        {
          src: 'img/icons/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
  },
});
