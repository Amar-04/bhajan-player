import { Slot, useSegments, router } from "expo-router";
import { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { ActivityIndicator, View } from "react-native";

export function AuthRedirect() {
  const { role, loading } = useAuth();
  const segments = useSegments();
  const redirected = useRef(false);

  useEffect(() => {
    if (loading) return;

    // only redirect once, when entering app
    if (!redirected.current) {
      if (role === "admin" && segments[0] !== "(admin)") {
        redirected.current = true;
        router.replace("/(admin)/bhajan-categories");
      } else if (role === "user" && segments[0] !== "(tabs)") {
        redirected.current = true;
        router.replace("/(tabs)/bhajan-categories");
      }
    }
  }, [role, loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }

  return <Slot />;
}
