import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { FlatList, ActivityIndicator, Alert, View } from "react-native";
import BhajanListItem from "../../components/BhajanListItem";
import Screen from "../../components/Screen";
import SearchBar from "../../components/SearchBar";
import { supabase } from "../../lib/supabase";

export default function BhajansByCategory() {
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();
  const [category, setCategory] = useState<any>(null);
  const [bhajans, setBhajans] = useState<any[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch category
        const { data: catData, error: catError } = await supabase
          .from("categories")
          .select("*")
          .eq("id", categoryId)
          .single();

        if (catError) throw catError;
        setCategory(catData);

        // Fetch bhajans in this category with category info
        const { data: bhajanData, error: bhajanError } = await supabase
          .from("bhajans")
          .select("*, categories(id, name, image_url)")
          .eq("category_id", categoryId);

        if (bhajanError) throw bhajanError;
        setBhajans(bhajanData ?? []);
      } catch (err: any) {
        Alert.alert("Error", err.message);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) fetchData();
  }, [categoryId]);

  const filtered = useMemo(
    () =>
      bhajans.filter(
        (b) =>
          b.title.toLowerCase().includes(q.toLowerCase()) ||
          (b.artist?.toLowerCase?.().includes(q.toLowerCase()) ?? false)
      ),
    [q, bhajans]
  );

  if (loading) {
    return (
      <Screen title="Loading..." back>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </Screen>
    );
  }

  return (
    <Screen title={category ? category.name : "Bhajans"} back>
      <SearchBar
        placeholder={`Search in ${category?.name ?? "category"}...`}
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
