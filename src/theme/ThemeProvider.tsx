import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";

import { getTheme, setTheme as persistTheme, type Theme } from "../storage/settings";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    getTheme().then(setThemeState);
  }, []);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    persistTheme(next);
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
