import { createContext, useContext, useReducer } from "react";
import { notesDraftReducer, notesReducer, notesTrashReducer } from "../reducer";

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, {
    notes: [
      {
        title: "hey man how you doing hopefully good?",
        note: "so its been a while that i have been pursuing this thing called as full stack development \nAnd I have been shitting my pants ever since I have decided to do so",
        color: "default",
        tags: ["hello", "world"],
        _id: "e2ae2d90-001c-4c5b-9e2e-eb41d67f1dc1",
      },
      {
        title: "lorem ipsum",
        note: "i dont know what the fuck im I supposed to write here to just fuck it",
        color: "#d7aefb",
        tags: ["random", " giberish"],
        _id: "1dbc1a2d-b3a8-4583-854f-27d1b738e364",
      },
    ],
    notesTrash: [],
  });

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalContext, GlobalContextProvider, useGlobalContext };

const globalReducer = (state, action) => {
  switch (action.for) {
    case "notes":
      return notesReducer(state, action);

    default:
      return state;
  }
};
