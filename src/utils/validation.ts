export const DEFAULT_QUANTITY = 1;
export const DEFAULT_REMINDER_TIME = "08:00";

export function parseNumericInput(rawValue: string): number | null {
  const trimmed = rawValue.trim();

  if (!trimmed || trimmed === ".") {
    return null;
  }

  const parsed = Number.parseFloat(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
}

export function normalizePositiveQuantity(value: number | string): number {
  const parsed = typeof value === "number" ? value : parseNumericInput(value);

  if (parsed === null || !Number.isFinite(parsed) || parsed <= 0) {
    return DEFAULT_QUANTITY;
  }

  return Number(parsed.toFixed(3));
}

export function normalizeReminderTime(rawValue: string): string {
  const candidate = rawValue?.trim();
  if (!candidate || !/^\d{1,2}:\d{2}$/.test(candidate)) {
    return DEFAULT_REMINDER_TIME;
  }

  const [hours, minutes] = candidate.split(":").map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return DEFAULT_REMINDER_TIME;
  }

  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    return DEFAULT_REMINDER_TIME;
  }

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}
