import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import router from "../router";

const signInUser = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      router.push("/chatroom");
    })
    .catch((error) => {
      throw new Error("Failed to sign in, please try again.", error);
    });
};

export { signInUser };
