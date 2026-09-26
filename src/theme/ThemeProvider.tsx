import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";

import { loadTheme, saveTheme } from "../services/milkService";
import type { Theme } from "../storage/settings";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    loadTheme().then(setThemeState);
  }, []);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    saveTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <PaperProvider theme={theme === "dark" ? MD3DarkTheme : MD3LightTheme}>
        {children}
      </PaperProvider>
    </ThemeContext.Provider>
  );
}

export function useAppTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useAppTheme must be used within an AppThemeProvider");
  }
  return context;
}
