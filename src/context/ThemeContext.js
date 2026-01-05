import React, { createContext, useState, useContext } from "react";

const ThemeContext = createContext();

export const themes = {
  light: {
    name: "light",
    containerBg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    panelBg: "#ffffff",
    headerBg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    headerText: "#ffffff",
    messagesBg: "#f8f9fa",
    userBubbleBg: "#667eea",
    userBubbleText: "#ffffff",
    botBubbleBg: "#e0e0e0",
    botBubbleText: "#333333",
    inputBg: "#ffffff",
    inputBorder: "#ddd",
    inputBorderFocus: "#667eea",
    inputText: "#000000",
    inputPlaceholder: "#999999",
    buttonBg: "#667eea",
    buttonHoverBg: "#5568d3",
    buttonText: "#ffffff",
    buttonStopBg: "#ff6b6b",
    buttonStopHoverBg: "#ff5252",
    borderColor: "#e0e0e0",
    scrollbarThumb: "#ccc",
    scrollbarHover: "#999",
  },
  dark: {
    name: "dark",
    containerBg: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
    panelBg: "#0f3460",
    headerBg: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
    headerText: "#e0e0e0",
    messagesBg: "#1a2332",
    userBubbleBg: "#e94560",
    userBubbleText: "#ffffff",
    botBubbleBg: "#2d3e50",
    botBubbleText: "#e0e0e0",
    inputBg: "#0f3460",
    inputBorder: "#3a4a5c",
    inputBorderFocus: "#e94560",
    inputText: "#e0e0e0",
    inputPlaceholder: "#888888",
    buttonBg: "#e94560",
    buttonHoverBg: "#d63450",
    buttonText: "#ffffff",
    buttonStopBg: "#ff6b6b",
    buttonStopHoverBg: "#ff5252",
    borderColor: "#3a4a5c",
    scrollbarThumb: "#556a7d",
    scrollbarHover: "#6d7f94",
  },
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const currentTheme = themes[theme];

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
