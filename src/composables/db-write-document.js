import { collection, addDoc } from "firebase/firestore";
import { db, timestamp } from "../config/firebase";

async function writeDocument(collection_name, data) {
  try {
    await addDoc(collection(db, collection_name), data);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export { writeDocument };
