module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production'
    ? '/bank-source/'
    : '/',
  runtimeCompiler: true,
  pwa: {
    name: 'My-app',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    display: 'standalone',
    appleMobileWebAppStatusBarStyle: 'black',

    // настройки манифеста
    manifestOptions: {
      name: 'My-app',
      short_name: 'MA',
      background_color: '#42B883',
      theme_color: '#42B883',
      orientation: 'portrait',
      display: 'standalone',
      start_url: '.'
    },
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      navigateFallback: 'index.html'
    }
  }
}
