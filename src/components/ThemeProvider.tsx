import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "dark" | "light";
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  resolvedTheme: "light",
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "bfxg-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    let effectiveTheme: "dark" | "light";

    if (theme === "system") {
      // Check time-based preference (dark between 7pm-7am)
      const hour = new Date().getHours();
      const isNightTime = hour >= 19 || hour < 7;

      // Also check system preference
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

      effectiveTheme = (isNightTime || systemTheme) ? "dark" : "light";
    } else {
      effectiveTheme = theme;
    }

    root.classList.add(effectiveTheme);
    setResolvedTheme(effectiveTheme);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");

      const hour = new Date().getHours();
      const isNightTime = hour >= 19 || hour < 7;
      const effectiveTheme = (isNightTime || mediaQuery.matches) ? "dark" : "light";

      root.classList.add(effectiveTheme);
      setResolvedTheme(effectiveTheme);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  // Check time every minute for auto-switching
  useEffect(() => {
    if (theme !== "system") return;

    const interval = setInterval(() => {
      const root = window.document.documentElement;
      const hour = new Date().getHours();
      const isNightTime = hour >= 19 || hour < 7;
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const effectiveTheme = (isNightTime || systemDark) ? "dark" : "light";

      if (!root.classList.contains(effectiveTheme)) {
        root.classList.remove("light", "dark");
        root.classList.add(effectiveTheme);
        setResolvedTheme(effectiveTheme);
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
    resolvedTheme,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
