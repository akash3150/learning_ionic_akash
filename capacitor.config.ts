import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'myapp',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  cordova: {
    preferences: {
      LottieFullScreen: "true",
      LottieHideAfterAnimationEnd: "true",
      LottieAnimationLocation: "public/assets/splash2.json"
    }
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    },
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: "609712439544-77r1k1a4fo02i7kv6cuktqqmeqde48s1.apps.googleusercontent.com",
      forceCodeForRefreshToken: true
    },
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#488AFF",
      sound: "beep.wav",
    }
  }
};

export default config;