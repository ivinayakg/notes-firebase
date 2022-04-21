import { useRef } from "react";
import { useTheme } from "../../context/themeContext";
import { LogoutIcon, MoonIcon, SearchIcon, SunIcon, XIcon } from "../icons";
import classes from "./searchComp.module.css";

const SearchComp = ({ toggleSearch, search, onSearchHandler }) => {
  const { theme, toggleTheme } = useTheme();
  const searchBarInput = useRef();

  const searchFormHandler = (e) => {
    e.preventDefault();
    onSearchHandler(searchBarInput.current.value.toLowerCase());
  };

  return (
    <nav className={classes.main}>
      <div className={classes.wrapper}>
        <button className={classes.logout + " btn-pri"}>
          <LogoutIcon />
        </button>
        <button className={classes.search + " btn-pri"} onClick={toggleSearch}>
          <SearchIcon />
        </button>
        <button className={classes.theme + " btn-pri"} onClick={toggleTheme}>
          {theme === "light" ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
      <form
        className={
          classes.searchBar + " " + (search ? classes.searchBar_active : "")
        }
        onSubmit={searchFormHandler}
      >
        <input type="text" name="search" ref={searchBarInput} />
        <button type="submit" className={classes.search + " btn-pri"}>
          <SearchIcon />
        </button>
        <button
          className={classes.close + " btn-pri"}
          onClick={() => {
            searchBarInput.current.value = "";
            toggleSearch();
          }}
        >
          <XIcon />
        </button>
      </form>
    </nav>
  );
};

export default SearchComp;
