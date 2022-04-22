import { createContext, useContext, useEffect, useReducer } from "react";
import { APIcalls, AuthChecker } from "../firebase";
import { notesReducer } from "../reducer";

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, {
    notes: [],
    notesTrash: [],
    isAuth: false,
  });

  useEffect(() => {
    if (state.isAuth) {
      APIcalls.getDataRealtime(dispatch, "notes");
      APIcalls.getDataRealtime(dispatch, "notesTrash");
    }
  }, [state.isAuth]);

  useEffect(() => {
    AuthChecker(dispatch);
  }, []);

  return (
    <GlobalContext.Provider value={{ state }}>
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalContext, GlobalContextProvider, useGlobalContext };
