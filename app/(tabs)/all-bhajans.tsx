import { useEffect, useMemo, useState } from "react";
import { FlatList, ActivityIndicator, View, Alert } from "react-native";
import BhajanListItem from "../../components/BhajanListItem";
import Screen from "../../components/Screen";
import SearchBar from "../../components/SearchBar";
import { supabase } from "../../lib/supabase";

export default function AllBhajans() {
  const [bhajans, setBhajans] = useState<any[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBhajans = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("bhajans")
          .select("*, categories(id, name, image_url)")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setBhajans(data ?? []);
      } catch (err: any) {
        Alert.alert("Error", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBhajans();
  }, []);

  const filtered = useMemo(
    () =>
      bhajans.filter(
        (b) =>
          b.title.toLowerCase().includes(q.toLowerCase()) ||
          (b.categories?.name?.toLowerCase()?.includes(q.toLowerCase()) ?? false)
      ),
    [q, bhajans]
  );

  if (loading) {
    return (
      <Screen title="All Bhajans">
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </Screen>
    );
  }

  return (
    <Screen title="All Bhajans">
      <SearchBar
        placeholder="Search bhajans..."
        value={q}
        onChangeText={setQ}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        renderItem={({ item }) => <BhajanListItem item={item} />}
        ListEmptyComponent={
          <View className="py-8 items-center">
            <ActivityIndicator size="small" color="#fff" />
          </View>
        }
      />
    </Screen>
  );
}
