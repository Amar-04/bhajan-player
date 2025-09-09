import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View, ActivityIndicator, Alert } from "react-native";
import Screen from "../../components/Screen";
import { supabase } from "../../lib/supabase";

export default function LyricsView() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [lyric, setLyric] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLyric = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("lyrics")
          .select("id, title, content, lyrics_categories(id, name)")
          .eq("id", id)
          .single();

        if (error) throw error;
        setLyric(data);
      } catch (err: any) {
        Alert.alert("Error", err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchLyric();
  }, [id]);

  if (loading) {
    return (
      <Screen title="Lyrics" back>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#FFB300" />
        </View>
      </Screen>
    );
  }

  if (!lyric) {
    return (
      <Screen title="Lyrics" back>
        <View className="flex-1 items-center justify-center">
          <Text className="text-white">Lyrics not found</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen title={lyric.title} back>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View className="bg-card rounded-2xl p-6 shadow">
          <Text
            className="text-primary text-xl mb-3"
            style={{ fontFamily: "Mukta_700Bold" }}
          >
            Category: {lyric.lyrics_categories?.name ?? "Unknown"}
          </Text>
          <Text
            className="text-black/90 leading-8"
            style={{ fontFamily: "Mukta_400Regular", fontSize: 18 }}
          >
            {lyric.content}
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
}
