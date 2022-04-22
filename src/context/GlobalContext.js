import { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { APIcalls, AuthChecker } from "../firebase";
import { notesReducer } from "../reducer";

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, {
    notes: [],
    notesTrash: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    AuthChecker(
      () => {
        APIcalls.getDataRealtime(dispatch, "notes");
        APIcalls.getDataRealtime(dispatch, "notesTrash");
        navigate("/home");
      },
      () => {
        navigate("/");
      }
    );
  }, []);

  return (
    <GlobalContext.Provider value={{ state }}>
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalContext, GlobalContextProvider, useGlobalContext };
