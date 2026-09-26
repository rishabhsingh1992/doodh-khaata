import { getAllEntries, addEntry as saveEntryToDb, deleteEntry, getMonthlyTotal } from "../storage/entries";
import {
  getDefaultQuantity,
  getReminderTime,
  getTheme,
  setDefaultQuantity as saveDefaultQuantityToStorage,
  setReminderTime as saveReminderTimeToStorage,
  setTheme as saveThemeToStorage,
  type Theme,
} from "../storage/settings";
import { scheduleDailyReminder } from "../notifications/reminders";
import type { Entry } from "../types/entry";
import {
  DEFAULT_QUANTITY,
  DEFAULT_REMINDER_TIME,
  normalizePositiveQuantity,
  normalizeReminderTime,
} from "../utils/validation";

export async function loadEntries(): Promise<Entry[]> {
  return getAllEntries();
}

export async function saveEntry(date: string, quantity: number): Promise<void> {
  const normalized = normalizePositiveQuantity(quantity);
  await saveEntryToDb(date, normalized);
}

export async function removeEntry(id: string): Promise<void> {
  await deleteEntry(id);
}

export async function loadMonthlyTotal(yearMonth: string): Promise<number> {
  return getMonthlyTotal(yearMonth);
}

export async function loadDefaultQuantity(): Promise<number> {
  const value = await getDefaultQuantity();
  return normalizePositiveQuantity(value);
}

export async function saveDefaultQuantity(rawValue: number | string): Promise<number> {
  const normalized = normalizePositiveQuantity(rawValue);
  await saveDefaultQuantityToStorage(normalized);
  return normalized;
}

export async function loadReminderTime(): Promise<string> {
  const value = await getReminderTime();
  return normalizeReminderTime(value || DEFAULT_REMINDER_TIME);
}

export async function saveReminderTime(rawValue: string): Promise<string> {
  const normalized = normalizeReminderTime(rawValue);
  await saveReminderTimeToStorage(normalized);
  return normalized;
}

export async function loadTheme(): Promise<Theme> {
  return getTheme();
}

export async function saveTheme(theme: Theme): Promise<void> {
  await saveThemeToStorage(theme);
}

export async function updateReminderSchedule(rawValue: string): Promise<string> {
  const normalized = await saveReminderTime(rawValue);
  await scheduleDailyReminder(normalized);
  return normalized;
}

export { DEFAULT_QUANTITY, DEFAULT_REMINDER_TIME };
