import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, usePathname, useSegments } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useAudio } from "../context/AudioProvider";

export default function MiniPlayer() {
  const { currentTrack, isPlaying, togglePlay } = useAudio();
  const segments = useSegments();
  const pathname = usePathname();

  if (!currentTrack) return null;

  // 👇 check if we are inside tabs
  const inTabs = segments[0] === "(tabs)";
  // 👇 hide miniplayer completely on player screen
  const isPlayerScreen = pathname.startsWith("/bhajans/player");

  if (isPlayerScreen) return null;

  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: inTabs ? 90 : 40, // ✅ adjust bottom position
        height: 60,
        overflow: "hidden",
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255,255,255,0.2)",
      }}
    >
      {/* Gradient background */}
      <LinearGradient
        colors={["#FF4500", "#DC143C"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ position: "absolute", left: 0, right: 0, bottom: 0, top: 0 }}
      />

      {/* Content */}
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 12,
        }}
      >
        {/* Artwork */}
        {currentTrack.categories?.image_url ? (
          <Image
            source={{ uri: currentTrack.categories.image_url }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              marginRight: 12,
            }}
          />
        ) : (
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              backgroundColor: "#444",
              marginRight: 12,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white" }}>ॐ</Text>
          </View>
        )}

        {/* Title & Category */}
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={0.9}
          onPress={() => router.push(`/bhajans/player?id=${currentTrack.id}`)}
        >
          <Text
            style={{ color: "white", fontFamily: "Mukta_700Bold" }}
            numberOfLines={1}
          >
            {currentTrack.title}
          </Text>
          <Text style={{ color: "white", fontSize: 12 }} numberOfLines={1}>
            {currentTrack.categories?.name ?? "Unknown"}
          </Text>
        </TouchableOpacity>

        {/* Play/Pause */}
        <TouchableOpacity onPress={togglePlay}>
          <MaterialIcons
            name={isPlaying ? "pause" : "play-arrow"}
            size={28}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
