import AsyncStorage from "@react-native-async-storage/async-storage";

import { DEFAULT_QUANTITY, DEFAULT_REMINDER_TIME } from "../utils/validation";

const KEYS = {
  theme: "settings:theme",
  defaultQuantity: "settings:defaultQuantity",
  reminderTime: "settings:reminderTime",
} as const;

export type Theme = "light" | "dark";

async function withStorageFallback<T>(operation: () => Promise<T>, fallback: T, label: string): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    console.warn(`Storage error (${label}):`, error);
    return fallback;
  }
}

export async function getTheme(): Promise<Theme> {
  return withStorageFallback(async () => {
    const value = await AsyncStorage.getItem(KEYS.theme);
    return value === "dark" ? "dark" : "light";
  }, "light", "getTheme");
}

export async function setTheme(theme: Theme): Promise<void> {
  await withStorageFallback(async () => {
    await AsyncStorage.setItem(KEYS.theme, theme);
    return undefined;
  }, undefined, "setTheme");
}

export async function getDefaultQuantity(): Promise<number> {
  return withStorageFallback(async () => {
    const value = await AsyncStorage.getItem(KEYS.defaultQuantity);
    const parsed = value ? Number.parseFloat(value) : NaN;
    return Number.isNaN(parsed) ? DEFAULT_QUANTITY : parsed;
  }, DEFAULT_QUANTITY, "getDefaultQuantity");
}

export async function setDefaultQuantity(quantity: number): Promise<void> {
  await withStorageFallback(async () => {
    await AsyncStorage.setItem(KEYS.defaultQuantity, String(quantity));
    return undefined;
  }, undefined, "setDefaultQuantity");
}

export async function getReminderTime(): Promise<string> {
  return withStorageFallback(async () => {
    const value = await AsyncStorage.getItem(KEYS.reminderTime);
    return value ?? DEFAULT_REMINDER_TIME;
  }, DEFAULT_REMINDER_TIME, "getReminderTime");
}

export async function setReminderTime(time: string): Promise<void> {
  await withStorageFallback(async () => {
    await AsyncStorage.setItem(KEYS.reminderTime, time);
    return undefined;
  }, undefined, "setReminderTime");
}
