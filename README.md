# Doodh Khata - Milk Tracker

A simple Expo (React Native) app to log daily milk purchases from your milkman. Two screens, local device storage only, no backend.

## App Summary

- **Platform:** Expo (React Native) + TypeScript
- **UI Library:** React Native Paper
- **Storage:** AsyncStorage or local SQLite (on-device only, no backend)
- **Screens:** 2 total
  1. **Home** – Add entry form (date + quantity) at the top, full history list below it on the same screen
  2. **Settings** – Light/dark theme toggle, daily reminder time picker, default quantity setting
- **Navigation:** Single gear icon on the Home screen opening Settings (no tabs, no sidebar)
- **Extra feature:** Local daily reminder notification (e.g., "Did you log today's milk?")

### Add Entry Screen

- Quantity input uses a custom on-screen number pad built into the app (not the phone's default keyboard), with a decimal point button placed sensibly for switching between whole numbers (1) and half values (1.5, 2.5)
- Quantity field pre-fills with the default quantity value configured in Settings
- Quick-tap adjustment buttons (e.g., +0.5L, +1L) bump the pre-filled default up or down for that day's exception
- Date input uses a calendar picker, defaulting to today

### Settings Screen

- Default quantity setting: pre-fills the Add Entry field each time the app opens
- Theme toggle: light mode and dark mode
- Reminder time picker: sets the daily local notification time

## Naming

- Repo name: `doodh-khata` (backup: `doodhwaala-log`)
- Play Store name: **Doodh Khata - Milk Tracker**
- Avoid: "Daily Milk," "Milk Track," "MilkMan," "Milk Diary," "Milk Manager" (already taken on Play Store)

## Getting Started

```bash
npm install
npm start        # then choose a platform in the Expo CLI
npm run android
npm run ios
npm run web
```

## Build Plan

- [x] **Phase 0 — Project Setup:** Blank Expo + TypeScript app scaffolded, git initialized.
- [ ] **Phase 1 — Core Dependencies & Theming:** Install React Native Paper, AsyncStorage (or Expo SQLite), Expo Notifications, a date picker library. Wrap the app in `PaperProvider` with persisted light/dark themes.
- [ ] **Phase 2 — Local Data Layer:** Storage functions (independent of UI) to add/get/delete milk entries and get/set the default quantity.
- [ ] **Phase 3 — Home Screen: Add Entry:** Date picker (defaults to today), custom number pad with decimal button, default-quantity pre-fill, quick-tap +0.5L/+1L buttons, Save button.
- [ ] **Phase 4 — Home Screen: History List:** Scrollable list of saved entries below the Add Entry form, most recent first, with an optional monthly running-total header.
- [ ] **Phase 5 — Settings Screen:** Gear icon navigation from Home, theme toggle, default quantity input, reminder time picker (UI only at this stage), all persisted locally.
- [ ] **Phase 6 — Daily Reminder Notifications:** Schedule a daily local notification via `expo-notifications` at the chosen time; reschedule when the time changes.
- [ ] **Phase 7 — Testing & Polish:** Verify persistence, default quantity, number pad, theming, and notifications; check phone/tablet layouts; polish spacing, typography, and dark mode.
- [ ] **Phase 8 — Publishing Prep:** Finalize app name, icon, and splash screen; create a Google Play Developer account; set up an EAS Build production profile.
- [ ] **Phase 9 — Play Store Submission:** Complete the Play Store listing (description, screenshots, privacy policy), upload the production build, submit for review.

## Future Ideas (not in v1)

- Invoice/bill calculation based on a rate per liter
- Voice command entry (e.g., "add two liters today")
- Multi-user support for the milkman to log deliveries directly
- Tracking fat content, price variability, or delivery skips

## License

See [LICENSE](./LICENSE).
