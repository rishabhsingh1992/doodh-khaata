import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, Card, Text } from "react-native-paper";
import { format } from "date-fns";

import NumberPad from "./NumberPad";
import QuickAdjustButtons from "./QuickAdjustButtons";
import { loadDefaultQuantity } from "../services/milkService";
import { parseNumericInput } from "../utils/validation";

type AddEntryFormProps = {
  onSave: (entry: { date: string; quantity: number }) => void;
};

export default function AddEntryForm({ onSave }: AddEntryFormProps) {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [quantity, setQuantity] = useState("1");
  const [defaultQuantity, setDefaultQuantity] = useState("1");

  useEffect(() => {
    loadDefaultQuantity().then((value) => {
      const stringValue = String(value);
      setDefaultQuantity(stringValue);
      setQuantity(stringValue);
    });
  }, []);

  const handleAdjust = (delta: number) => {
    const current = parseNumericInput(quantity) ?? 0;
    setQuantity(String(current + delta));
  };

  const handleSave = () => {
    const parsed = parseNumericInput(quantity);
    if (parsed === null) {
      return;
    }
    onSave({ date: format(date, "yyyy-MM-dd"), quantity: parsed });
    setQuantity(defaultQuantity);
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" onPress={() => setShowPicker(true)}>
          {format(date, "EEE, d MMM yyyy")}
        </Text>
        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            onChange={(_event, selected) => {
              setShowPicker(false);
              if (selected) {
                setDate(selected);
              }
            }}
          />
        )}

        <Text variant="displaySmall" style={styles.quantity}>
          {quantity || "0"} L
        </Text>

        <QuickAdjustButtons onAdjust={handleAdjust} />

        <NumberPad value={quantity} onChange={setQuantity} />

        <View style={styles.saveRow}>
          <Button mode="contained" onPress={handleSave}>
            Save
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  quantity: {
    textAlign: "center",
    marginVertical: 12,
  },
  saveRow: {
    marginTop: 12,
  },
});
