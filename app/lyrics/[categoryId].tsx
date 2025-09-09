import { useEffect, useMemo, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { FlatList, ActivityIndicator, View, Alert } from "react-native";
import LyricsListItem from "../../components/LyricsListItem";
import Screen from "../../components/Screen";
import SearchBar from "../../components/SearchBar";
import { supabase } from "../../lib/supabase";

export default function LyricsByCategory() {
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();
  const [category, setCategory] = useState<any>(null);
  const [lyrics, setLyrics] = useState<any[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch category + lyrics for that category
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // fetch category
        const { data: catData, error: catError } = await supabase
          .from("lyrics_categories")
          .select("id, name, image_url")
          .eq("id", categoryId)
          .single();

        if (catError) throw catError;
        setCategory(catData);

        // fetch lyrics
        const { data: lyricData, error: lyricError } = await supabase
          .from("lyrics")
          .select("id, title, content, lyrics_categories(id, name, image_url)")
          .eq("category_id", categoryId)
          .order("created_at", { ascending: false });

        if (lyricError) throw lyricError;
        setLyrics(lyricData ?? []);
      } catch (err: any) {
        Alert.alert("Error", err.message);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) fetchData();
  }, [categoryId]);

  // search filter
  const filtered = useMemo(
    () =>
      lyrics.filter(
        (l) =>
          l.title.toLowerCase().includes(q.toLowerCase()) ||
          l.content.toLowerCase().includes(q.toLowerCase())
      ),
    [q, lyrics]
  );

  if (loading) {
    return (
      <Screen title="Lyrics" back>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </Screen>
    );
  }

  return (
    <Screen title={category ? category.name : "Lyrics"} back>
      <SearchBar
        placeholder={`Search in ${category?.name ?? "category"}...`}
        value={q}
        onChangeText={setQ}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        renderItem={({ item }) => <LyricsListItem item={item} />}
        ListEmptyComponent={
          <View className="py-8 items-center">
            <ActivityIndicator size="small" color="#fff" />
          </View>
        }
      />
    </Screen>
  );
}
