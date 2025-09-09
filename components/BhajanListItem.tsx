import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View, Image } from "react-native";

export default function BhajanListItem({ item }: { item: any }) {
  return (
    <TouchableOpacity
      className="bg-white/10 rounded-2xl flex-row items-center"
      activeOpacity={0.9}
      onPress={() =>
        router.push({ pathname: "/bhajans/player", params: { id: item.id } })
      }
      style={{
        backgroundColor: "rgba(255,255,255,0.1)",
        borderRadius: 16,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 12,
      }}
    >
      {/* Left avatar */}
      {item.categories?.image_url ? (
        <Image
          source={{ uri: item.categories.image_url }}
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            marginRight: 12,
          }}
        />
      ) : (
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: "yellow",
            marginRight: 12,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Mukta_700Bold",
              fontSize: 18,
              color: "#6A1B9A",
              lineHeight: 22,
            }}
          >
            ॐ
          </Text>
        </View>
      )}

      {/* Center text block */}
      <View style={{ flex: 1 }}>
        <Text
          style={{ fontFamily: "Mukta_700Bold", fontSize: 18, color: "yellow" }}
          numberOfLines={1}
        >
          {item.title}
        </Text>
        <Text
          style={{
            color: "rgba(255,255,255,0.85)",
            fontFamily: "Mukta_400Regular",
            fontSize: 15,
            marginTop: 2,
          }}
          numberOfLines={1}
        >
          {item.categories.name}
        </Text>
        <Text
          style={{
            color: "rgba(255,255,255,0.6)",
            fontFamily: "Mukta_400Regular",
            fontSize: 12,
            marginTop: 2,
          }}
        >
          {item.duration}
        </Text>
      </View>

      {/* Play button on the right */}
      <View
        className="items-center justify-center"
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: "rgba(0,0,0,0.18)",
          marginLeft: 8,
        }}
      >
        <MaterialIcons name="play-arrow" size={20} color="#FFB300" />
      </View>
    </TouchableOpacity>
  );
}
