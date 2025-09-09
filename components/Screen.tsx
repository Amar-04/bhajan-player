import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Text, TouchableOpacity, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../lib/supabase"; // ✅ adjust path if needed
import { useEffect, useState } from "react";

export default function Screen({
  title,
  children,
  back = false,
}: {
  title: string;
  children: React.ReactNode;
  back?: boolean;
}) {
  const [isAdmin, setIsAdmin] = useState(false);

  // 🔹 check auth session on mount
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      const role = data.session?.user?.user_metadata?.role;
      setIsAdmin(role === "admin");
    };
    checkSession();

    // 🔹 listen to auth changes (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const role = session?.user?.user_metadata?.role;
        setIsAdmin(role === "admin");
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLongPress = async () => {
    const { data } = await supabase.auth.getSession();
    const role = data.session?.user?.user_metadata?.role;

    if (role === "admin") {
      Alert.alert("Info", "Logged in as admin 👑");
    } else {
      router.push("/admin-login");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
    router.replace("/"); // back to user side
  };

  return (
    <LinearGradient
      colors={["#FF7F50", "#FF8C00", "#C86E3B"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1, marginTop: 10, marginBottom: -48 }}>
        <View className="px-4 pt-1 pb-2">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              {back && (
                <TouchableOpacity
                  onPress={() => router.back()}
                  className="pr-2 py-1"
                >
                  <MaterialIcons
                    name="chevron-left"
                    size={24}
                    color="#FFB300"
                  />
                </TouchableOpacity>
              )}

              {/* 🔹 Long press title */}
              <TouchableOpacity onLongPress={handleLongPress} activeOpacity={1}>
                <Text
                  className="text-5xl"
                  style={{
                    fontFamily: "Mukta_700Bold",
                    marginLeft: 20,
                    fontSize: 24,
                    color: "yellow",
                  }}
                >
                  {title}
                </Text>
              </TouchableOpacity>
            </View>

            {/* 🔹 Show logout button only if admin */}
            {isAdmin && (
              <TouchableOpacity
                onPress={handleLogout}
                style={{ paddingHorizontal: 13, paddingVertical: 5, marginRight: 10,  backgroundColor: "gold", borderRadius: 8, }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Logout
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={{ flex: 1 }}>{children}</View>
      </SafeAreaView>
    </LinearGradient>
  );
}
