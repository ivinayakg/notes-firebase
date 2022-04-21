import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useGlobalContext } from "../../context/GlobalContext";
import { increaseHeightTextarea } from "../../utils";
import {
  ArrowLeftIcon,
  CheckIcon,
  ColorPallete,
  StarIcon,
  StarOutlinedIcon,
} from "../icons";
import classes from "./noteform.module.css";

const NoteForm = ({ closeModal, showModal, isMobile }) => {
  const colorOptions = [
    "#cfe1b9",
    "#ccff90",
    "#fbbc04",
    "#fff475",
    "#a7ffeb",
    "#aecbfa",
    "#d7aefb",
    "#fdcfe8",
    "default",
  ];
  const [colorModal, setColorModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "Untitled",
    note: "None",
    color: "default",
    tags: [],
    star: false,
    draft: false,
  });
  const { dispatch, state } = useGlobalContext();

  //get the note which has to updated if opened a particular note
  const { noteId } = useParams();
  const thisNote = state.notes.find((entry) => entry._id === noteId);

  const updateFormData = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //this is when you click on the submit button
  const submitFormHandler = () => {
    if (formData.note !== "None") {
      dispatch({
        for: "notes",
        type: "ADD",
        branch: "notes",
        payload: { ...formData, _id: uuid() },
      });
      closeModal();
      setFormData({
        title: "Untitled",
        note: "None",
        color: "default",
        tags: [],
        star: false,
        draft: false,
      });
    }
  };

  // if for some reason the user press the back button but there is still data in the note form
  // then its going to saved automatically in the backend but here if the back button on the broswer is clicked or also the UI button clicked

  useEffect(() => {
    if (!showModal && formData.note !== "None" && !formData._id) {
      dispatch({
        for: "notes",
        type: "ADD",
        branch: "notes",
        payload: {
          ...formData,
          _id: uuid(),
          tags: [...formData.tags, "draft"],
          draft: true,
        },
      });
    }
  }, [showModal, dispatch, formData]);

  //reset the formdata when the modal is close and opened
  useEffect(() => {
    if (showModal && !thisNote) {
      setFormData({
        title: "Untitled",
        note: "None",
        color: "default",
        tags: [],
        star: false,
        draft: false,
      });
      setColorModal(false);
    } else if (thisNote) {
      setFormData({ ...thisNote });
    }
  }, [showModal, thisNote]);

  const updateNote = () => {
    dispatch({
      for: "notes",
      type: "UPDATE",
      branch: "notes",
      payload: {
        ...formData,
        draft: false,
        tags: formData.tags.filter((tag) => tag !== "draft"),
      },
    });
    closeModal();
    setFormData({
      title: "Untitled",
      note: "None",
      color: "default",
      tags: [],
      star: false,
      draft: false,
    });
  };

  //this way we can switch between modal and normal dom component easily as the jsx is going to be the same
  const mainJSX = (
    <main
      className={classes.main + " " + (showModal ? classes.main_active : "")}
    >
      <header className={classes.header}>
        <button
          onClick={() => closeModal()}
          className={classes.btn + " " + classes.backBtn}
        >
          <ArrowLeftIcon />
        </button>
        <span
          className={classes.colorBox + " " + classes.colorList}
          style={{
            backgroundColor:
              formData.color === "default" ? "transparent" : formData.color,
          }}
        >
          <div
            className={
              classes.colorListWrap +
              " " +
              (colorModal ? classes.colorListWrap_active : "")
            }
          >
            {colorOptions.map((color) => (
              <span
                key={color}
                className={classes.colorBox}
                style={{ backgroundColor: color }}
                onClick={() => {
                  setColorModal(false);
                  setFormData((prev) => ({ ...prev, color: color }));
                }}
              ></span>
            ))}
          </div>
        </span>
        <button
          onClick={() => setColorModal((prev) => !prev)}
          className={classes.btn + " " + classes.colorBtn}
        >
          <ColorPallete />
        </button>
        <button
          className={classes.btn + " " + classes.starBtn + " btn-pri"}
          onClick={() => setFormData((prev) => ({ ...prev, star: !prev.star }))}
        >
          {formData.star ? <StarIcon /> : <StarOutlinedIcon />}
          <span>Star</span>
        </button>
        <button
          className={classes.btn + " " + classes.submitBtn + " btn-pri"}
          onClick={thisNote ? updateNote : submitFormHandler}
        >
          <CheckIcon />
          <span>Save</span>
        </button>
      </header>

      <form className={classes.form}>
        <textarea
          className={classes.input + " " + classes.inputTags}
          cols={1}
          type="text"
          name="tags"
          value={formData.tags.length > 0 ? formData.tags : ""}
          onChange={(e) => {
            setFormData((prev) => ({
              ...prev,
              tags: e.target.value.split(",") ?? [],
            }));
            increaseHeightTextarea(e);
          }}
          placeholder="tags... (add a comma)"
        />
        <textarea
          className={classes.input + " " + classes.inputTitle}
          cols={1}
          rows={3}
          type="text"
          name="title"
          value={formData.title !== "Untitled" ? formData.title : ""}
          onChange={(e) => {
            updateFormData(e);
            increaseHeightTextarea(e);
          }}
          placeholder="Untitled..."
        />
        <textarea
          cols={1}
          className={classes.input + " " + classes.inputNote}
          type="text"
          name="note"
          value={formData.note !== "None" ? formData.note : ""}
          onChange={(e) => {
            updateFormData(e);
            increaseHeightTextarea(e, true);
          }}
          placeholder="Note..."
        />
      </form>
    </main>
  );

  return isMobile ? createPortal(mainJSX, document.body) : <>{mainJSX}</>;
};

export default NoteForm;
