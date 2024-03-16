"use client";
import { useTheme } from "next-themes";
import { FloatButton } from "antd";

const ThemeChangerFab = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = () => {
    // Toggle between light and dark themes
    setTheme(theme === "light" ? "dark" : "light");
  };

  return <FloatButton onClick={handleThemeChange} />;
};

export default ThemeChangerFab;
