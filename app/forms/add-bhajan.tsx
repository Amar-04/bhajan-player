import { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { supabase } from "../../lib/supabase";
import { router } from "expo-router";
import Screen from "../../components/Screen";
import { uploadFileToMediaBucket } from "../../lib/upload";
import RNPickerSelect from 'react-native-picker-select';

export default function AddBhajan() {
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [audio, setAudio] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Load categories from Supabase
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("id, name");
      if (error) {
        Alert.alert("Error", error.message);
      } else {
        setCategories(data || []);
      }
    };
    fetchCategories();
  }, []);

  const pickAudio = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "audio/*",
    });
    if (!result.canceled) setAudio(result.assets[0].uri);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !categoryId.trim())
      return Alert.alert("Error", "Title and category are required");

    setLoading(true);
    try {
      let audioUrl: string | null = null;
      if (audio) {
        audioUrl = await uploadFileToMediaBucket(audio, "audio/bhj");
      }
      const { error } = await supabase
        .from("bhajans")
        .insert({ title, category_id: categoryId, audio_url: audioUrl });
      if (error) throw error;
      Alert.alert("Success", "Bhajan added!");
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
    <Screen title="Add Bhajan" back>
      <View className="flex-1 items-center justify-center px-6">
        {/* Title */}
        <TextInput
          placeholder="Bhajan Title"
          placeholderTextColor="#999"
          value={title}
          onChangeText={setTitle}
          className="w-full border border-gray-300 bg-white rounded-xl px-4 py-3 mb-4 text-lg"
        />

        {/* Category Dropdown */}
        {categories.length === 0 ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <View className="w-full border border-gray-300 bg-white rounded-xl mb-6">
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

        {/* Audio Upload */}
        <TouchableOpacity
          onPress={pickAudio}
          className="w-full bg-white py-4 rounded-xl mb-4"
        >
          <Text className="text-center text-lg font-semibold text-black">
            {audio ? "Change Audio" : "Pick Audio File"}
          </Text>
        </TouchableOpacity>

        {/* Submit */}
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={loading}
          className="w-full bg-gold py-4 rounded-xl"
        >
          <Text className="text-center text-lg font-semibold text-black">
            {loading ? "Saving..." : "Add Bhajan"}
          </Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}