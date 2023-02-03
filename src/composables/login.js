import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { ref } from "vue";
import router from "../router";

const errorCode = ref();
const isValidating = ref();

const signInUser = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      router.push("/chatroom");
    })
    .catch((error) => {
      if (error.code == "auth/invalid-email") {
        errorCode.value = "invalid email address format";
      } else if (error.code == "auth/wrong-password") {
        errorCode.value = "invalid password";
      } else if (error.code == "auth/invalid-email") {
        errorCode.value = "invalid email address";
      } else if (error.code == "auth/user-not-found") {
        errorCode.value = "user not found";
      } else {
        errorCode.value = "unknown error occurred";
      }
      console.log(error.code);
    })
    .finally(() => {
      isValidating.value = false;
    });
};

export { signInUser, errorCode, isValidating };
