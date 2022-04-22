import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { GlobalContextProvider } from "./context/GlobalContext";
import { ThemeContextProvider } from "./context/themeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <GlobalContextProvider>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </GlobalContextProvider>
  </BrowserRouter>
);
