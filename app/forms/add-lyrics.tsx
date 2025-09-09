import { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { supabase } from "../../lib/supabase";
import { router } from "expo-router";
import Screen from "../../components/Screen";
import { Picker } from "@react-native-picker/picker";

export default function AddLyrics() {
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);

  // fetch categories for dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from("lyrics_categories") // 👈 use lyrics_categories
          .select("id, name")
          .order("name", { ascending: true });

        if (error) throw error;
        setCategories(data ?? []);
      } catch (err: any) {
        Alert.alert("Error", err.message);
      } finally {
        setFetching(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    if (!title.trim() || !categoryId.trim() || !content.trim())
      return Alert.alert("Error", "All fields are required");

    setLoading(true);
    try {
      const { error } = await supabase
        .from("lyrics")
        .insert({ title, category_id: categoryId, content }); // 👈 category_id references lyrics_categories.id
      if (error) throw error;
      Alert.alert("Success", "Lyrics added!");
      router.back();
    } catch (err: any) {
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen title="Add Lyrics" back>
      <ScrollView
        className="flex-1 px-6 py-4"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Title */}
        <TextInput
          placeholder="Lyrics Title"
          placeholderTextColor="#999"
          value={title}
          onChangeText={setTitle}
          className="w-full border border-gray-300 bg-white rounded-xl px-4 py-3 mb-4 text-lg"
        />

        {/* Category dropdown */}
        {fetching ? (
          <ActivityIndicator size="small" color="#fff" className="mb-4" />
        ) : (
          <View className="w-full border border-gray-300 bg-white rounded-xl mb-4">
            <Picker
              selectedValue={categoryId}
              onValueChange={(val) => setCategoryId(val)}
            >
              <Picker.Item label="Select Category" value="" />
              {categories.map((c) => (
                <Picker.Item key={c.id} label={c.name} value={c.id} />
              ))}
            </Picker>
          </View>
        )}

        {/* Content */}
        <TextInput
          placeholder="Lyrics Content"
          placeholderTextColor="#999"
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
          className="w-full border border-gray-300 bg-white rounded-xl px-4 py-3 mb-6 text-lg"
          style={{ minHeight: 180 }}
        />

        {/* Submit button */}
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={loading}
          className="w-full bg-gold py-4 rounded-xl"
        >
          <Text className="text-center text-lg font-semibold text-black">
            {loading ? "Saving..." : "Add Lyrics"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </Screen>
  );
}
