import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

type QuickAdjustButtonsProps = {
  onAdjust: (delta: number) => void;
};

const ADJUSTMENTS = [0.5, 1];

export default function QuickAdjustButtons({ onAdjust }: QuickAdjustButtonsProps) {
  return (
    <View style={styles.row}>
      {ADJUSTMENTS.map((delta) => (
        <Button
          key={delta}
          mode="outlined"
          style={styles.button}
          onPress={() => onAdjust(delta)}
        >
          {`+${delta}L`}
        </Button>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  button: {
    flex: 1,
  },
});
