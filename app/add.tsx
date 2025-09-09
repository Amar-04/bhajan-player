import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import Screen from "../components/Screen";

export default function AddScreen() {
  return (
    <Screen title="Add New" back>
      <View style={{ flex: 1, padding: 20 }}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "600",
            marginBottom: 20,
            color: "white",
          }}
        >
          What do you want to add?
        </Text>

        <TouchableOpacity
          style={{ marginBottom: 15 }}
          onPress={() => router.push("/forms/add-bhajan-category")}
        >
          <Text style={{ fontSize: 18, color: "yellow" }}>
            ➕ Add Bhajan Category
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginBottom: 15 }}
          onPress={() => router.push("/forms/add-bhajan")}
        >
          <Text style={{ fontSize: 18, color: "yellow" }}>➕ Add Bhajan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginBottom: 15 }}
          onPress={() => router.push("/forms/add-lyrics-category")}
        >
          <Text style={{ fontSize: 18, color: "yellow" }}>
            ➕ Add Lyrics Category
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginBottom: 15 }}
          onPress={() => router.push("/forms/add-lyrics")}
        >
          <Text style={{ fontSize: 18, color: "yellow" }}>➕ Add Lyrics</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}
