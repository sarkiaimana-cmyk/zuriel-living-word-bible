import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: process.env.ZURIEL_ANDROID_APP_ID || "com.zuriel.livingwordbible.github",
  appName: "Zuriel Living Word Bible",
  webDir: "www",
  backgroundColor: "#102b24",
  android: {
    backgroundColor: "#102b24"
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1200,
      backgroundColor: "#102b24",
      showSpinner: false
    }
  }
};

export default config;
