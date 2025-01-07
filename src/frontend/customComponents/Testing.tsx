import { Text } from "@rneui/themed";
import { ScrollView, View, StyleSheet } from "react-native";

interface ColorPaletteProps {
  colors: { name: string; hex: string }[];
}
function Testing({ colors }: ColorPaletteProps) {
  const style = styles;
  return (
    <ScrollView horizontal style={styles.container}>
      {colors.map((color, index) => (
        <View
          key={index}
          style={[styles.colorBox, { backgroundColor: color.hex }]}
        >
          <Text style={styles.colorLabel}>{color.name}</Text>
          <Text style={styles.colorHex}>{color.hex}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
  },
  colorBox: {
    width: 100,
    height: 100,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    elevation: 2,
  },
  colorLabel: {
    color: "#FFF",
    fontWeight: "bold",
  },
  colorHex: {
    color: "#FFF",
    fontSize: 12,
  },
});

export default Testing;
