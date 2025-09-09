import { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "../../lib/supabase";
import { router } from "expo-router";
import Screen from "../../components/Screen";
import { uploadFileToMediaBucket } from "../../lib/upload";

export default function AddLyricsCategory() {
  const [name, setName] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const handleSubmit = async () => {
    if (!name.trim()) return Alert.alert("Error", "Name is required");
    setLoading(true);
    try {
      let imageUrl: string | null = null;
      if (image) {
        imageUrl = await uploadFileToMediaBucket(
          image,
          "images/lyrics-categories"
        );
      }
      const { error } = await supabase
        .from("lyrics_categories")
        .insert({ name, image_url: imageUrl });
      if (error) throw error;
      Alert.alert("Success", "Category added!");
      router.back();
    } catch (err: any) {
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen title="Add Lyrics Category" back>
      <View className="flex-1 items-center justify-center px-6">
        <TextInput
          placeholder="Category Name"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
          className="w-full border border-gray-300 bg-white rounded-xl px-4 py-3 mb-6 text-lg"
        />
        {image && <Image source={{ uri: image }} className="w-32 h-32 mb-4 rounded-xl" />}
        <TouchableOpacity
          onPress={pickImage}
          className="w-full bg-white py-4 rounded-xl mb-4"
        >
          <Text className="text-center text-lg font-semibold text-black">
            {image ? "Change Image" : "Pick Image"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={loading}
          className="w-full bg-gold py-4 rounded-xl"
        >
          <Text className="text-center text-lg font-semibold text-black">
            {loading ? "Saving..." : "Add Category"}
          </Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}
