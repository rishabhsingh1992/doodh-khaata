import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useTheme } from "react-native-paper";

import { AppThemeProvider, useAppTheme } from "../theme/ThemeProvider";
import { getReminderTime } from "../storage/settings";
import { scheduleDailyReminder } from "../notifications/reminders";

function RootNavigator() {
  const { theme } = useAppTheme();
  const paperTheme = useTheme();

  return (
    <>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: paperTheme.colors.background },
        }}
      />
    </>
  );
}

export default function RootLayout() {
  useEffect(() => {
    getReminderTime().then(scheduleDailyReminder);
  }, []);

  return (
    <SafeAreaProvider>
      <AppThemeProvider>
        <RootNavigator />
      </AppThemeProvider>
    </SafeAreaProvider>
  );
}
