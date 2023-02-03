import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { ref } from "vue";
import router from "../router";

const errorCode = ref();

const signUpUser = async (email, password) => {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      router.push("/");
    })
    .catch((error) => {
      errorCode.value = error.code;
    });
};

export { signUpUser, errorCode };
