import { Route, Routes } from "react-router-dom";
import Homepage from "./homepage";
import LandingPage from "./LandingPage";

const Main = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/home/add-note/:noteId" element={<Homepage />} />
        <Route path="/home/*" element={<Homepage />} />
      </Routes>
    </>
  );
};

export default Main;
