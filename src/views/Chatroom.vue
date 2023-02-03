<template>
  <h2>Welcome to the chatroom</h2>
  <div class="chatroom">
    <div class="inner-wrapper">
      <div class="messages">
        <div v-for="doc in documents" :key="doc.message">
          <div class="msg">{{ doc.message }}, {{ doc.user }}</div>
        </div>
      </div>
      <div class="new-msg">
        <form @submit.prevent="handleSubmit">
          <input type="text" name="new" id="" placeholder="new message" v-model="newMessage" />
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { auth, timestamp } from "./../config/firebase";
import { writeDocument } from "../composables/db-write-document";
import { getCollection, documents } from "../composables/db-get-collection";

const newMessage = ref();

onMounted(() => {
  getCollection("messages");
});

async function handleSubmit() {
  const chat = {
    user: `${auth.currentUser.email.slice(0, auth.currentUser.email.indexOf("@"))}`,
    message: newMessage.value,
    createdAt: timestamp,
  };

  await writeDocument("messages", chat);
  await getCollection("messages");

  newMessage.value = "";
}
</script>

<style scoped>
.chatroom {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid black;
  border-radius: 16px;
  width: 100%;
  min-height: 400px;
}

.inner-wrapper {
  padding: 32px;
}

.messages {
}
.msg {
  font-weight: 300;
  text-align: start;
}
</style>
