import { MaterialIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View, ActivityIndicator, Alert } from "react-native";
import Screen from "../../components/Screen";
import { supabase } from "../../lib/supabase";

function formatTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

export default function PlayerScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [bhajans, setBhajans] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(1);

  // Fetch bhajans from Supabase
  useEffect(() => {
    const fetchBhajans = async () => {
      try {
        const { data, error } = await supabase
          .from("bhajans")
          .select("*, categories(id, name, image_url)")
          .order("created_at", { ascending: true });

        if (error) throw error;

        setBhajans(data || []);

        // Find index of the bhajan user tapped
        const startIndex = data?.findIndex((b) => b.id === id) ?? 0;
        setCurrentIndex(startIndex >= 0 ? startIndex : 0);
      } catch (err: any) {
        Alert.alert("Error", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBhajans();
  }, [id]);

  const item = bhajans[currentIndex];

  // Load / Reload sound when track changes
  useEffect(() => {
    let soundObj: Audio.Sound;

    async function loadSound() {
      if (!item?.audio_url) return;

      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: item.audio_url }
      );
      soundObj = newSound;
      setSound(newSound);

      const status = await newSound.getStatusAsync();
      if (status.isLoaded) setDuration(status.durationMillis || 1);

      newSound.setOnPlaybackStatusUpdate((s) => {
        if (s.isLoaded) {
          setPosition(s.positionMillis);
          setDuration(s.durationMillis || 1);
          setIsPlaying(s.isPlaying);

          // auto skip to next when finished
          if (s.didJustFinish) {
            handleNext();
          }
        }
      });

      await newSound.playAsync(); // autoplay
    }

    if (item) loadSound();

    return () => {
      if (soundObj) {
        soundObj.unloadAsync();
      }
    };
  }, [currentIndex, bhajans]);

  const togglePlay = async () => {
    if (!sound) return;
    isPlaying ? await sound.pauseAsync() : await sound.playAsync();
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < bhajans.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : bhajans.length - 1));
  };

  const handleSeek = async (value: number) => {
    if (sound) {
      await sound.setPositionAsync(value);
    }
  };

  if (loading || !item) {
    return (
      <Screen title="Loading..." back>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </Screen>
    );
  }

  return (
    <Screen title={item.title} back>
      <View className="flex-1 items-center justify-center px-8">
        <Image
          source={{ uri: item.categories?.image_url || "https://via.placeholder.com/150" }}
          className="w-56 h-56 rounded-2xl mb-6"
        />
        <Text
          className="text-gold text-2xl mb-1"
          style={{ fontFamily: "Mukta_700Bold" }}
        >
          {item.title}
        </Text>
        <Text
          className="text-white/80 mb-8"
          style={{ fontFamily: "Mukta_400Regular" }}
        >
          {item.categories?.name ?? "Unknown Category"}
        </Text>

        {/* Seek bar */}
        <Slider
          style={{ width: "100%", height: 40 }}
          minimumValue={0}
          maximumValue={duration}
          value={position}
          minimumTrackTintColor="#FFB300"
          maximumTrackTintColor="#FFFFFF55"
          thumbTintColor="#FFB300"
          onSlidingComplete={handleSeek}
        />

        {/* Time display */}
        <View className="w-full flex-row justify-between mb-6">
          <Text className="text-white/70">{formatTime(position)}</Text>
          <Text className="text-white/70">{formatTime(duration)}</Text>
        </View>

        {/* Controls */}
        <View className="flex-row items-center gap-6">
          <TouchableOpacity
            className="bg-overlay/70 p-4 rounded-full"
            onPress={handlePrev}
          >
            <MaterialIcons name="skip-previous" size={24} color="#FFB300" />
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-overlay p-6 rounded-full"
            onPress={togglePlay}
          >
            <MaterialIcons
              name={isPlaying ? "pause" : "play-arrow"}
              size={28}
              color="#FFB300"
            />
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-overlay/70 p-4 rounded-full"
            onPress={handleNext}
          >
            <MaterialIcons name="skip-next" size={24} color="#FFB300" />
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
}
