import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { createUser } from "./firestore";

const provider = new GoogleAuthProvider();

const auth = getAuth();

export const LoginWithGoogle = async (navigate) => {
  try {
    const result = await signInWithPopup(auth, provider);
    await createUser(result.user);
    localStorage.setItem("userId", result.user.uid);
    navigate("/home");
  } catch (error) {
    console.error(error);
  }
};

export const signOutHandler = () => {
  signOut(auth)
    .then((result) => {
      localStorage.clear();
    })
    .catch((error) => {
      // An error happened.
    });
};

export const AuthChecker = (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) dispatch({ type: "AUTH", payload: true });
    else dispatch({ type: "AUTH", payload: false });
  });
};
