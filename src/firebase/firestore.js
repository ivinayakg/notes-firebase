import {
  getFirestore,
  collection,
  doc,
  serverTimestamp,
  onSnapshot,
  deleteDoc,
  updateDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { app } from "./setup";
import { v4 as uuid } from "uuid";

export const db = getFirestore(app);

export const createUser = async (data) => {
  const user = await getDoc(doc(db, "accounts", data.uid));
  if (!user.data()) {
    await setDoc(doc(db, "accounts", data.uid), {
      uid: data.uid,
      email: data.email,
      name: data.displayName,
      photoUrl: data.reloadUserInfo.photoUrl,
    });
    // await setDoc(doc(db, "accounts", data.uid, "notes", uuid()), {
    //   title: "Welcome To Remeber Me",
    //   note: "This is your first Note",
    //   color: "default",
    //   tags: [],
    //   star: false,
    //   draft: false,
    //   timestamp: serverTimestamp(),
    // });
    // await setDoc(doc(db, "accounts", data.uid, "notesTrash", uuid()), {
    //   title: "Welcome To Remeber Me",
    //   note: "This is your first Trash Note",
    //   color: "default",
    //   tags: [],
    //   star: false,
    //   draft: false,
    //   timestamp: serverTimestamp(),
    // });
  }
};

const addData = async (type, data) => {
  let userId = localStorage.getItem("userId");

  await setDoc(doc(db, "accounts", userId, type, uuid()), {
    ...data,
    timestamp: serverTimestamp(),
  });
};

const deleteData = async (type, data) => {
  let userId = localStorage.getItem("userId");
  let docRef = doc(db, "accounts", userId, type, data._id);
  await deleteDoc(docRef);
};

const updateData = async (type, data) => {
  let userId = localStorage.getItem("userId");
  let docRef = doc(db, "accounts", userId, type, data._id);
  await updateDoc(docRef, { ...data, timestamp: serverTimestamp() });
};

const getDataRealtime = (dispatch, collectionName) => {
  let userId = localStorage.getItem("userId");
  const notesCollection = collection(
    db,
    `accounts/${userId}/${collectionName}`
  );
  onSnapshot(notesCollection, (data) => {
    let dataArray = data.docs.map((item) => ({
      ...item.data(),
      _id: item.id,
    }));
    dispatch({
      type: "UPDATE_STATE_SNAPSHOT",
      payload: dataArray,
      branch: collectionName,
    });
  });
};

export const APIcalls = {
  addData,
  getDataRealtime,
  deleteData,
  updateData,
};
