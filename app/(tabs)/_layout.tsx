import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import { View, ActivityIndicator, TouchableOpacity  } from "react-native";
import { useAuth } from "../../context/AuthContext"; 
import { router } from "expo-router";

const TabBg = () => (
  <LinearGradient
    colors={["#FF4500", "#DC143C"]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={{ position: "absolute", left: 0, right: 0, bottom: 0, top: 0 }}
  />
);

export default function TabsLayout() {
  const { role, loading } = useAuth();
  
  
  const isAdmin = () => role === "admin";

  
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FF4500" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarBackground: () => <TabBg />,
          tabBarActiveTintColor: "yellow",
          tabBarInactiveTintColor: "gold",
          tabBarStyle: {
            height: 100,
            borderTopWidth: 0,
            backgroundColor: "transparent",
          },
          tabBarLabelStyle: { fontFamily: "Mukta_600SemiBold" },
        }}
      >
        
        <Tabs.Screen
          name="bhajan-categories"
          options={{
            title: "Categories",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="grid-view" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="all-bhajans"
          options={{
            title: "All Bhajans",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="music-note" size={size} color={color} />
            ),
          }}
        />
        
        {/* Admin-only tabs - hidden for regular users */}
        <Tabs.Screen
          name="lyrics-categories"
          options={{
            title: "Lyrics Categ...",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="library-books" size={size} color={color} />
            ),
            href: isAdmin() ? "/lyrics-categories" : null, 
          }}
        />
        <Tabs.Screen
          name="all-lyrics"
          options={{
            title: "All Lyrics",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="description" size={size} color={color} />
            ),
            href: isAdmin() ? "/all-lyrics" : null, 
          }}
        />
      </Tabs>
      {/* Floating Add Button - only admin */}
      {role === "admin" && (
        <TouchableOpacity
          onPress={() => router.push("/add")}
          style={{
            position: "absolute",
            bottom: 120,
            right: 20,
            backgroundColor: "orange",
            borderRadius: 50,
            padding: 16,
            elevation: 5,
          }}
        >
          <MaterialIcons name="add" size={32} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
}