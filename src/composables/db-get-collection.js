import { collection, query, orderBy, getDocs, limit, getCountFromServer } from "firebase/firestore";

import { ref } from "vue";

import { db } from "../config/firebase";

const documents = ref({});
const areAllMessagesLoaded = ref(false);
const numOfMessagesCurrentlyLoaded = ref(0);

const getCollection = async (collection_name, query_limit) => {
  if (!areAllMessagesLoaded.value) {
    let data = [];

    // define query parameters
    const q = query(collection(db, collection_name), orderBy("createdAt", "desc"), limit(query_limit));

    const coll = collection(db, collection_name);
    const snapshot = await getCountFromServer(coll);
    const numOfAllMessages = snapshot.data().count;

    if (query_limit < snapshot.data().count) {
      // query documents
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        data.push(doc.data());
      });
      documents.value = data;

      numOfMessagesCurrentlyLoaded.value = data.length;
    } else {
      // query all documents
      const qMax = query(collection(db, collection_name), orderBy("createdAt", "desc"), limit(numOfAllMessages));

      const querySnapshot = await getDocs(qMax);

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        data.push(doc.data());
      });
      documents.value = data;

      areAllMessagesLoaded.value = true;

      numOfMessagesCurrentlyLoaded.value = data.length;
    }
  }
};

export { getCollection, documents, areAllMessagesLoaded, numOfMessagesCurrentlyLoaded };
