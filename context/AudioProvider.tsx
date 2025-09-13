import { Audio } from "expo-av";
import React, { createContext, useContext, useEffect, useState } from "react";
type Track = {
  id: string;
  title: string;
  audio_url: string;
  categories?: { id: string; name: string; image_url?: string };
};
type AudioContextType = {
  currentTrack: Track | null;
  isPlaying: boolean;
  position: number;
  duration: number;
  playTrack: (track: Track) => Promise<void>;
  togglePlay: () => Promise<void>;
  seek: (ms: number) => Promise<void>;
};
const AudioContext = createContext<AudioContextType | undefined>(undefined);
export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(1);
  const playTrack = async (track: Track) => {
    try {
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: track.audio_url },
        { shouldPlay: true }
      );
      setSound(newSound);
      setCurrentTrack(track);
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isLoaded) return;
        setIsPlaying(status.isPlaying);
        setPosition(status.positionMillis);
        setDuration(status.durationMillis || 1);
      });
    } catch (err) {
      console.error("Error playing track:", err);
    }
  };
  const togglePlay = async () => {
    if (!sound) return;
    const status = await sound.getStatusAsync();
    if (!status.isLoaded) return;
    if (status.isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  };
  const seek = async (ms: number) => {
    if (sound) {
      await sound.setPositionAsync(ms);
    }
  };
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);
  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        isPlaying,
        position,
        duration,
        playTrack,
        togglePlay,
        seek,
      }}
    >
      {" "}
      {children}{" "}
    </AudioContext.Provider>
  );
}
export const useAudio = () => {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used inside AudioProvider");
  return ctx;
};
