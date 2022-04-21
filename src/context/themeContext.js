import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

const getInitialMode = () => {
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  if (prefersDarkScheme.matches) {
    return "dark";
  } else {
    return "light";
  }
};

const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialMode());

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

export { ThemeContext, ThemeContextProvider, useTheme };
