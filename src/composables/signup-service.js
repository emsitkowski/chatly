import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import router from "../router";

const signUpUser = async (email, password) => {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      router.push("/");
    })
    .catch((error) => {
      throw new Error("Failed to register, please try again.", error);
    });
};

export { signUpUser };
