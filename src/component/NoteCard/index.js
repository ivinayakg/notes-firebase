import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { APIcalls } from "../../firebase";
import { RestoreIcon, StarIcon, StarOutlinedIcon, TrashIcon } from "../icons";
import classes from "./notecard.module.css";

const NoteCard = ({ data }) => {
  const [exit, setExit] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const deleteNoteHandler = () => {
    setExit(true);
    setTimeout(() => {
      APIcalls.deleteData(
        pathname === "/home/trash" ? "notesTrash" : "notes",
        data
      );
      if (pathname !== "/home/trash") APIcalls.addData("notesTrash", data);
    }, 300);
  };
  const restoreNoteHandler = () => {
    setExit(true);
    setTimeout(() => {
      APIcalls.deleteData("notesTrash", data);
      APIcalls.addData("notes", data);
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
