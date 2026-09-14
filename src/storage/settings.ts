import AsyncStorage from "@react-native-async-storage/async-storage";

const KEYS = {
  theme: "settings:theme",
  defaultQuantity: "settings:defaultQuantity",
  reminderTime: "settings:reminderTime",
} as const;

export type Theme = "light" | "dark";

export async function getTheme(): Promise<Theme> {
  const value = await AsyncStorage.getItem(KEYS.theme);
  return value === "dark" ? "dark" : "light";
}

export async function setTheme(theme: Theme): Promise<void> {
  await AsyncStorage.setItem(KEYS.theme, theme);
}

export async function getDefaultQuantity(): Promise<number> {
  const value = await AsyncStorage.getItem(KEYS.defaultQuantity);
  const parsed = value ? Number.parseFloat(value) : NaN;
  return Number.isNaN(parsed) ? 1 : parsed;
}

export async function setDefaultQuantity(quantity: number): Promise<void> {
  await AsyncStorage.setItem(KEYS.defaultQuantity, String(quantity));
}

export async function getReminderTime(): Promise<string> {
  const value = await AsyncStorage.getItem(KEYS.reminderTime);
  return value ?? "08:00";
}

export async function setReminderTime(time: string): Promise<void> {
  await AsyncStorage.setItem(KEYS.reminderTime, time);
}
