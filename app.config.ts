import 'dotenv/config'

export default {
  expo: {
    name: 'rn-demo-app',
    slug: 'rn-demo-app',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    extra: {
      apiKey: process.env.YELP_API_KEY,
      apiBaseUrl: process.env.YELP_API_BASE_URL,
    },
    experiments: {
      tsconfigPaths: true,
    },
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
    },
    web: {
      favicon: './assets/favicon.png',
    },
  },
}
