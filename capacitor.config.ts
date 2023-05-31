import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'myapp',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  // cordova: {
  //   preferences: {
  //     LottieFullScreen: "true",
  //     LottieHideAfterAnimationEnd: "true",
  //     LottieAnimationLocation: "public/assets/splash2.json"
  //   }
  // },
  ios: {
    preferredContentMode: "mobile"
  },
  plugins: {
    // SplashScreen: {
    //   launchShowDuration: 0
    // },
    SplashScreen: {
      launchShowDuration: 0,
      launchAutoHide: true,
      launchFadeOutDuration: 3000,
      backgroundColor: "#ffffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#999999",
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: "launch_screen",
      useDialog: true,
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