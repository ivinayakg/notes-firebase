import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";
import { RestoreIcon, StarIcon, StarOutlinedIcon, TrashIcon } from "../icons";
import classes from "./notecard.module.css";

const NoteCard = ({ data }) => {
  const [exit, setExit] = useState(false);
  const { dispatch } = useGlobalContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const deleteNoteHandler = () => {
    setExit(true);
    setTimeout(() => {
      dispatch({
        for: "notes",
        type: "REMOVE",
        branch: pathname === "/home/trash" ? "trash" : "notes",
        payload: data,
      });
      if (pathname !== "/home/trash")
        dispatch({
          for: "notes",
          type: "ADD",
          branch: "trash",
          payload: data,
        });
    }, 300);
  };
  const restoreNoteHandler = () => {
    setExit(true);
    setTimeout(() => {
      dispatch({
        for: "notes",
        type: "REMOVE",
        branch: "trash",
        payload: data,
      });
      dispatch({
        for: "notes",
        type: "ADD",
        branch: "notes",
        payload: data,
      });
    }, 300);
  };

  const openNote = () => {
    if (pathname !== "/home/trash") navigate(`/home/add-note/${data._id}`);
  };

  return (
    <div className={classes.main + " " + (exit ? classes.main_exit : "")}>
      {data.tags.length > 0 && (
        <span className={classes.tags}>
          {data.tags.map((entry, index) => (
            <p key={index} className={classes.tag}>
              {entry}
            </p>
          ))}
        </span>
      )}

      <h3 className={classes.title} onClick={openNote}>
        {data.title}
      </h3>
      <p className={classes.note} onClick={openNote}>
        {data.note.slice(0, 80)}...
      </p>
      <span className={classes.extras}>
        {pathname === "/home/trash" && (
          <button className={classes.restore} onClick={restoreNoteHandler}>
            <RestoreIcon />
          </button>
        )}
        <button className={classes.trash} onClick={deleteNoteHandler}>
          <TrashIcon />
        </button>
        {data.color !== "default" && (
          <span
            className={classes.colorBox}
            style={{ backgroundColor: data.color }}
          ></span>
        )}
        {data.star ? <StarIcon /> : <StarOutlinedIcon />}
      </span>
    </div>
  );
};

export default NoteCard;
