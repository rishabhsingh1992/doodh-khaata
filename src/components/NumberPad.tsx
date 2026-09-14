import { StyleSheet, View } from "react-native";
import { IconButton, Text } from "react-native-paper";

type NumberPadProps = {
  value: string;
  onChange: (value: string) => void;
};

const ROWS = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  [".", "0", "backspace"],
];

export default function NumberPad({ value, onChange }: NumberPadProps) {
  const handlePress = (key: string) => {
    if (key === "backspace") {
      onChange(value.slice(0, -1));
      return;
    }
    if (key === "." && value.includes(".")) {
      return;
    }
    onChange(value + key);
  };

  return (
    <View style={styles.container}>
      {ROWS.map((row) => (
        <View style={styles.row} key={row.join("")}>
          {row.map((key) => (
            <View style={styles.keyWrapper} key={key}>
              {key === "backspace" ? (
                <IconButton icon="backspace-outline" onPress={() => handlePress(key)} />
              ) : (
                <Text
                  variant="titleLarge"
                  style={styles.key}
                  onPress={() => handlePress(key)}
                >
                  {key}
                </Text>
              )}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  keyWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  key: {
    textAlign: "center",
    width: "100%",
    paddingVertical: 8,
  },
});
