import NoteCard from "../NoteCard";
import classes from "./notesContainer.module.css";

const NotesContainer = ({ dataArray }) => {
  return (
    <div className={classes.main}>
      {dataArray.map((entry) => (
        <NoteCard data={entry} key={entry._id} />
      ))}
    </div>
  );
};

export default NotesContainer;
