import {
  Mukta_400Regular,
  Mukta_600SemiBold,
  Mukta_700Bold,
  useFonts,
} from "@expo-google-fonts/mukta";
import { Slot, SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "../context/AuthContext";
import "./globals.css";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Mukta_400Regular,
    Mukta_600SemiBold,
    Mukta_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
