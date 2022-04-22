import { StrictMode, useEffect } from "react";
import { useTheme } from "./context/themeContext";
import Main from "./pages";
import "./App.css";

function App() {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.className = theme === "dark" ? "dark-mode" : "";
  }, [theme]);

  return (
    <div className="App">
      <StrictMode>
        <Main />
      </StrictMode>
    </div>
  );
}

export default App;
