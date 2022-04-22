import classes from "./homepage.module.css";
import { PlusCircleIcon } from "../../component/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useReducer } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import {
  Navigator,
  NoteForm,
  NotesContainer,
  SearchComp,
} from "../../component";
import { CheckNotesArray } from "../../utils";
import { homeStateReducer } from "../../reducer";

const Homepage = () => {
  const { state } = useGlobalContext();
  const { pathname } = useLocation();
  const addNote =
    pathname === "/home/add-note" || pathname.includes("/home/add-note");
  const navigate = useNavigate();

  const [homeState, homeStateDispatch] = useReducer(homeStateReducer, {
    search: false,
    isMobile: true,
    notesType: CheckNotesArray(state, pathname),
    searchQuery: "",
  });

  const closeModalForm = (cb) => {
    //if there is a custom function i want to run while close the modal form
    if (cb) cb();
    navigate(-1);
  };

  useEffect(
    () =>
      homeStateDispatch({
        type: "UPDATE_NOTES",
        payload: CheckNotesArray(state, pathname),
      }),
    [pathname, state]
  );

  const searchQueryHandler = (value) => {
    homeStateDispatch({
      type: "SEARCH_QUERY",
      payload: value,
    });
  };

  const FilteredNotes = homeState.notesType.filter((entry) => {
    return (
      entry.title.toLowerCase().includes(homeState.searchQuery) ||
      entry.tags.find((tag) => tag.toLowerCase() === homeState.searchQuery)
    );
  });

  return (
    <>
      <button
        className={
          classes.addForm + " " + (addNote ? classes.addForm_active : "")
        }
        onClick={() => navigate("/home/add-note")}
      >
        <PlusCircleIcon />
      </button>
      <div className={classes.main}>
        <SearchComp
          search={homeState.search}
          toggleSearch={() => homeStateDispatch({ type: "TOGGLE_SEARCH" })}
          onSearchHandler={searchQueryHandler}
        />
        <NoteForm
          showModal={addNote}
          closeModal={closeModalForm}
          isMobile={homeState.isMobile}
        />
        <NotesContainer
          dataArray={FilteredNotes}
          isMobile={homeState.isMobile}
        />
        <Navigator />
      </div>
    </>
  );
};

export default Homepage;
