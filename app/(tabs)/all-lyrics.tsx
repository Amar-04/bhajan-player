import { useEffect, useMemo, useState } from "react";
import { FlatList, ActivityIndicator, View, Alert } from "react-native";
import LyricsListItem from "../../components/LyricsListItem";
import Screen from "../../components/Screen";
import SearchBar from "../../components/SearchBar";
import { supabase } from "../../lib/supabase";

export default function AllLyrics() {
  const [lyrics, setLyrics] = useState<any[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch all lyrics from Supabase
  useEffect(() => {
    const fetchLyrics = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("lyrics")
          .select("id, title, content, lyrics_categories(id, name, image_url)") // join with categories
          .order("created_at", { ascending: false });

        if (error) throw error;
        setLyrics(data ?? []);
      } catch (err: any) {
        Alert.alert("Error", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLyrics();
  }, []);

  // Search filter
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
      <Screen title="All Lyrics">
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </Screen>
    );
  }

  return (
    <Screen title="All Lyrics">
      <SearchBar
        placeholder="Search lyrics..."
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
