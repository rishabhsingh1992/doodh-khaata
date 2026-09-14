import { Platform } from "react-native";
import Constants, { AppOwnership } from "expo-constants";

const CHANNEL_ID = "daily-reminder";

// expo-notifications crashes on import in Expo Go (SDK 53+) because it eagerly
// registers for push tokens, which Expo Go no longer supports. Local
// notifications still work fine in a development/production build, so only
// load the module outside of Expo Go.
const isExpoGo = Constants.appOwnership === AppOwnership.Expo;

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Notifications = isExpoGo ? null : (require("expo-notifications") as typeof import("expo-notifications"));

if (Notifications) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
}

async function ensureAndroidChannel(): Promise<void> {
  if (!Notifications || Platform.OS !== "android") {
    return;
  }
  await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
    name: "Daily reminder",
    importance: Notifications.AndroidImportance.DEFAULT,
  });
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (!Notifications) {
    return false;
  }
  const current = await Notifications.getPermissionsAsync();
  if (current.granted) {
    return true;
  }
  const requested = await Notifications.requestPermissionsAsync();
  return requested.granted;
}

export async function scheduleDailyReminder(time: string): Promise<void> {
  if (!Notifications) {
    return;
  }

  const granted = await requestNotificationPermission();
  if (!granted) {
    return;
  }

  await ensureAndroidChannel();
  await Notifications.cancelAllScheduledNotificationsAsync();

  const [hour, minute] = time.split(":").map(Number);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Doodh Khaata",
      body: "Did you log today's milk?",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute,
      channelId: CHANNEL_ID,
    },
  });
}

export async function cancelDailyReminder(): Promise<void> {
  if (!Notifications) {
    return;
  }
  await Notifications.cancelAllScheduledNotificationsAsync();
}
