import { StrictMode, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
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
      <BrowserRouter>
        <StrictMode>
          <Main />
        </StrictMode>
      </BrowserRouter>
    </div>
  );
}

export default App;
