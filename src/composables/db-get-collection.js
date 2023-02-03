import { collection, query, orderBy, getDocs } from "firebase/firestore";

import { ref } from "vue";

import { db } from "../config/firebase";

const documents = ref({});

const getCollection = async (collection_name) => {
  let data = [];

  // define query parameters
  const q = query(collection(db, collection_name), orderBy("createdAt"));

  // query documents
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data.push(doc.data());
  });
  documents.value = data;
};

export { getCollection, documents };
