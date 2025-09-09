import { MaterialIcons } from "@expo/vector-icons";
import { Dimensions, TextInput, View } from "react-native";

const { width } = Dimensions.get("window");

export default function SearchBar({
  value,
  onChangeText,
  placeholder,
}: {
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
}) {
  return (
    <View
      style={{
        width: width * 0.91,
        alignSelf: "center",
        marginTop: 20,
        height: 48, // 👈 fixed height (same on iOS & Android)
      }}
      className="mb-4 flex-row items-center bg-card rounded-2xl px-3"
    >
      <MaterialIcons name="search" size={20} color="#A46A16" />
      <TextInput
        className="flex-1 ml-2 text-base text-[#A46A16]"
        placeholder={placeholder}
        placeholderTextColor="#A46A16"
        value={value}
        onChangeText={onChangeText}
        style={{
          paddingVertical: 0, // 👈 prevents iOS from shrinking height
          height: "100%", // 👈 makes TextInput fill parent height
        }}
      />
    </View>
  );
}
