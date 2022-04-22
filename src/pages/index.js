import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import Homepage from "./homepage";
import LandingPage from "./LandingPage";

const Main = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home/add-note/:noteId" element={<Homepage />} />
          <Route path="/home/*" element={<Homepage />} />
        </Route>
      </Routes>
    </>
  );
};

const ProtectedRoute = () => {
  const {
    state: { isAuth },
  } = useGlobalContext();
  return isAuth ? <Outlet /> : <Navigate to={"/"} />;
};

export default Main;
