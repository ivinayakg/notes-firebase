import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GlobalContextProvider } from "./context/GlobalContext";
import { ThemeContextProvider } from "./context/themeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GlobalContextProvider>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </GlobalContextProvider>
);
