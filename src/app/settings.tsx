import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Stack } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { List, Switch, Text, TextInput, useTheme } from "react-native-paper";

import { useAppTheme } from "../theme/ThemeProvider";
import {
  getDefaultQuantity,
  getReminderTime,
  setDefaultQuantity as persistDefaultQuantity,
  setReminderTime as persistReminderTime,
} from "../storage/settings";
import { scheduleDailyReminder } from "../notifications/reminders";

function timeStringToDate(time: string): Date {
  const [hours, minutes] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}

function dateToTimeString(date: Date): string {
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

export default function SettingsScreen() {
  const { theme, setTheme } = useAppTheme();
  const paperTheme = useTheme();
  const [defaultQuantity, setDefaultQuantityState] = useState("1");
  const [reminderTime, setReminderTimeState] = useState("08:00");
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    getDefaultQuantity().then((value) => setDefaultQuantityState(String(value)));
    getReminderTime().then(setReminderTimeState);
  }, []);

  const handleDefaultQuantityChange = (value: string) => {
    setDefaultQuantityState(value);
    const parsed = Number.parseFloat(value);
    if (!Number.isNaN(parsed)) {
      persistDefaultQuantity(parsed);
    }
  };

  const handleReminderTimeChange = (date: Date) => {
    const value = dateToTimeString(date);
    setReminderTimeState(value);
    persistReminderTime(value);
    scheduleDailyReminder(value);
  };

  return (
    <View style={[styles.container, { backgroundColor: paperTheme.colors.background }]}>
      <Stack.Screen options={{ title: "Settings" }} />

      <List.Item
        title="Dark mode"
        right={() => (
          <Switch
            value={theme === "dark"}
            onValueChange={(value) => setTheme(value ? "dark" : "light")}
          />
        )}
      />

      <View style={styles.section}>
        <Text variant="labelLarge" style={styles.label}>
          Default quantity (L)
        </Text>
        <TextInput
          mode="outlined"
          keyboardType="decimal-pad"
          value={defaultQuantity}
          onChangeText={handleDefaultQuantityChange}
        />
      </View>

      <List.Item
        title="Daily reminder time"
        description={reminderTime}
        onPress={() => setShowTimePicker(true)}
      />
      {showTimePicker && (
        <DateTimePicker
          value={timeStringToDate(reminderTime)}
          mode="time"
          onChange={(_event, selected) => {
            setShowTimePicker(false);
            if (selected) {
              handleReminderTimeChange(selected);
            }
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  label: {
    marginBottom: 8,
  },
});
