<template>
  <div class="new-msg">
    <form @submit.prevent="handleSubmit">
      <input type="text" name="new" id="" placeholder="new message" v-model="newMessage" :disabled="isSending" />
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { writeDocument } from "../composables/db-write-document";
import { getCollection } from "../composables/db-get-collection";
import { auth, timestamp } from "./../config/firebase";

const newMessage = ref();
const isSending = ref();

async function handleSubmit() {
  isSending.value = true;

  const chat = {
    user: `${auth.currentUser.email.slice(0, auth.currentUser.email.indexOf("@"))}`,
    message: newMessage.value,
    createdAt: timestamp,
  };

  await writeDocument("messages", chat);
  await getCollection("messages");

  isSending.value = false;
  newMessage.value = "";
}
</script>

<style scoped>
.msg {
  font-weight: 300;
  text-align: start;
}
</style>
