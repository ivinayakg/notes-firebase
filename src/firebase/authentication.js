import {
  getAuth,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  signInWithRedirect,
} from "firebase/auth";
import { createUser } from "./firestore";

const provider = new GoogleAuthProvider();

const auth = getAuth();

export const LoginWithGoogle = async () => {
  try {
    await signInWithRedirect(auth, provider);
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

export const AuthChecker = (cb, failcb) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      localStorage.setItem("userId", user.uid);
      await createUser(user);
      cb();
    } else failcb();
  });
};
