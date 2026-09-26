import { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Stack, useFocusEffect, useRouter } from "expo-router";
import { IconButton, useTheme } from "react-native-paper";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";

import AddEntryForm from "../components/AddEntryForm";
import HistoryList from "../components/HistoryList";
import { loadEntries, saveEntry } from "../services/milkService";
import type { Entry } from "../types/entry";

export default function HomeScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [entries, setEntries] = useState<Entry[]>([]);

  const refreshEntries = useCallback(async () => {
    const stored = await loadEntries();
    setEntries(stored);
  }, []);

  useEffect(() => {
    refreshEntries();
  }, [refreshEntries]);

  useFocusEffect(
    useCallback(() => {
      refreshEntries();
    }, [refreshEntries])
  );

  const handleSave = async (entry: { date: string; quantity: number }) => {
    await saveEntry(entry.date, entry.quantity);
    await refreshEntries();
  };

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={styles.container}
    >
      <Stack.Screen
        options={{
          title: "Doodh Khaata",
          headerRight: () => (
            <IconButton
              icon={({ size, color }) => (
                <MaterialDesignIcons name="cog" size={size} color={color} />
              )}
              onPress={() => router.push("/settings")}
            />
          ),
        }}
      />
      <AddEntryForm onSave={handleSave} />
      <HistoryList entries={entries} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
