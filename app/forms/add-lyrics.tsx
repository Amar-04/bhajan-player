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
import RNPickerSelect from 'react-native-picker-select';

export default function AddLyrics() {
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from("lyrics_categories")
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
      const { error } = await supabase.from("lyrics").insert({
        title,
        category_id: categoryId,
        content,
      });
      if (error) throw error;
      Alert.alert("Success", "Lyrics added!");
      router.back();
    } catch (err: any) {
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  // Format categories for react-native-picker-select
  const pickerItems = categories.map(cat => ({
    label: cat.name,
    value: cat.id
  }));

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

        {/* Category Dropdown */}
        {fetching ? (
          <ActivityIndicator size="small" color="#fff" className="mb-4" />
        ) : (
          <View className="w-full border border-gray-300 bg-white rounded-xl mb-4">
            <RNPickerSelect
              onValueChange={(value) => setCategoryId(value)}
              items={pickerItems}
              placeholder={{
                label: 'Select Category',
                value: null,
                color: '#999',
              }}
              style={{
                inputIOS: {
                  fontSize: 18,
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  color: 'black',
                },
                inputAndroid: {
                  fontSize: 18,
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  color: 'black',
                },
                placeholder: {
                  color: '#999',
                  fontSize: 18,
                },
              }}
              value={categoryId}
              useNativeAndroidPickerStyle={false}
            />
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

        {/* Submit Button */}
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