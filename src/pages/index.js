import { Route, Routes } from "react-router-dom";
import { useTheme } from "../context/themeContext";
import Homepage from "./homepage";

const Main = () => {
  const { toggleTheme } = useTheme();

  return (
    <>
      <Routes>
        <Route path="/home/add-note/:noteId" element={<Homepage />} />
        <Route path="/home/*" element={<Homepage />} />
      </Routes>
    </>
  );
};

export default Main;
