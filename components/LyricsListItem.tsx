import { router } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

export default function LyricsListItem({ item }: { item: any }) {
  // create a preview from first 2–3 lines of content
  const preview =
    item.content
      ?.split("\n")
      .slice(0, 3) // first 3 lines
      .join("\n")
      .trim() ?? "";

  return (
    <TouchableOpacity
      className="bg-card rounded-2xl p-4"
      activeOpacity={0.9}
      onPress={() =>
        router.push({ pathname: "/lyrics/view", params: { id: item.id } })
      }
    >
      <Text
        className="text-primary text-xl mb-2"
        style={{ fontFamily: "Mukta_700Bold" }}
        numberOfLines={1}
      >
        {item.title}
      </Text>
      <Text
        className="text-black/70"
        numberOfLines={2}
        style={{ fontFamily: "Mukta_400Regular", fontSize: 15, lineHeight: 22 }}
      >
        {preview}
      </Text>
    </TouchableOpacity>
  );
}
