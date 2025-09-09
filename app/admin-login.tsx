import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";
import Screen from "../components/Screen";

export default function AdminLogin() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const success = await login(email, password);
    if (success) {
      Alert.alert("Success", "Admin logged in");
      router.back(); 
    } else {
      Alert.alert("Error", "Invalid credentials");
    }
  };

  return (
    <Screen title="Admin Login" back>
      <View className="flex-1 justify-center px-6">
        <TextInput
          placeholder="Email"
          placeholderTextColor="white"
          className="bg-gold/80 text-white p-4 rounded-xl mb-4"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="white"
          className="bg-gold text-white p-4 rounded-xl mb-6"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          className="bg-yellow-300 p-4 rounded-xl"
          onPress={handleLogin}
        >
          <Text
            className="text-black text-center font-bold"
            style={{ fontFamily: "Mukta_700Bold" }}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}
