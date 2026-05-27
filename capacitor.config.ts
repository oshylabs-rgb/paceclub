import type { CapacitorConfig } from "@capacitor/cli";

/**
 * PaceClub Capacitor wrapper.
 *
 * Strategy: wrap the live web PWA at paceclub.run so we get one source of truth.
 * Server.url points at production so the native app effectively hosts the live
 * site. Updates ship instantly when we deploy to Vercel — no store re-review
 * required for content or behaviour changes. Only platform-level changes
 * (icons, splash, permissions) need a store resubmission.
 *
 * Organizer Stripe payments stay routed via a web link (Capacitor Browser
 * plugin → in-app Safari/Chrome Custom Tab → paceclub.run/upgrade), which is
 * permitted for B2B subscriptions under Apple and Google's current guidelines.
 */
const config: CapacitorConfig = {
  appId: "eu.oshylabs.paceclub",
  appName: "PaceClub",
  webDir: "out",
  bundledWebRuntime: false,
  server: {
    url: process.env.NEXT_PUBLIC_APP_URL ?? "https://paceclub.run",
    cleartext: false,
    androidScheme: "https",
    iosScheme: "https"
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      backgroundColor: "#ffffff",
      showSpinner: false,
      androidSplashResourceName: "splash",
      iosSpinnerStyle: "small"
    },
    StatusBar: {
      style: "DEFAULT",
      backgroundColor: "#ffffff"
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    }
  },
  ios: {
    contentInset: "automatic",
    backgroundColor: "#ffffff"
  },
  android: {
    backgroundColor: "#ffffff",
    allowMixedContent: false
  }
};

export default config;
