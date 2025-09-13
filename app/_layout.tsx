import {
  Mukta_400Regular,
  Mukta_600SemiBold,
  Mukta_700Bold,
  useFonts,
} from "@expo-google-fonts/mukta";
import { Slot, SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MiniPlayer from "../components/MiniPlayer";
import { AudioProvider } from "../context/AudioProvider";
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
        <AudioProvider>
          <View style={{ flex: 1 }}>
            {/* 👇 Your Screens */} <Slot /> {/* 👇 MiniPlayer overlay */}
            <MiniPlayer />
          </View>
        </AudioProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
