import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from "react-native";
import Screen from "../../components/Screen";
import SearchBar from "../../components/SearchBar";
import { supabase } from "../../lib/supabase";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2; // 16px padding + 16px gap

export default function LyricsCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch categories from Supabase
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("lyrics_categories") // 👈 your table
          .select("id, name, image_url")
          .order("created_at", { ascending: true });

        if (error) throw error;
        setCategories(data ?? []);
      } catch (err: any) {
        console.error("Error fetching lyrics categories:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Filter categories by search query
  const filtered = useMemo(
    () => categories.filter((c) => c.name.toLowerCase().includes(q.toLowerCase())),
    [q, categories]
  );

  if (loading) {
    return (
      <Screen title="Lyrics Categories">
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </Screen>
    );
  }

  return (
    <Screen title="Lyrics Categories">
      <SearchBar
        placeholder="Search categories..."
        value={q}
        onChangeText={setQ}
      />

      <FlatList
        data={filtered}
        numColumns={2}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={{ gap: 16, paddingHorizontal: 16 }}
        contentContainerStyle={{ paddingVertical: 16, gap: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              width: CARD_WIDTH,
              height: CARD_WIDTH + 40,
            }}
            className="bg-card rounded-3xl p-6 items-center shadow"
            activeOpacity={0.85}
            onPress={() =>
              router.push({
                pathname: "/lyrics/[categoryId]",
                params: { categoryId: item.id },
              })
            }
          >
            {item.image_url ? (
              <Image
                source={{ uri: item.image_url }}
                className="w-32 h-32 mb-4 rounded-full border-2 border-gold"
              />
            ) : (
              <Text className="text-gray-400 mb-4">No Image</Text>
            )}
            <Text
              className="text-primary text-lg text-center"
              style={{ fontFamily: "Mukta_700Bold" }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </Screen>
  );
}
