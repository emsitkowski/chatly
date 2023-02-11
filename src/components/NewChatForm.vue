<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" name="new" placeholder="new message" v-model="newMessage" :disabled="isSending" />

    <Button class="square" :isLoading="isSending">
      <template v-slot:icon>
        <img src="@/assets/img/paper-plane-outline.svg" alt="paper plane" />
      </template>
    </Button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { writeDocument } from "../composables/db-write-document";
import { getCollection } from "../composables/db-get-collection";
import { auth, timestamp } from "./../config/firebase";
import Button from "../components/Button.vue";

const newMessage = ref();
const isSending = ref();

const emit = defineEmits(["submitted"]);

async function handleSubmit() {
  if (newMessage.value.length > 0) {
    isSending.value = true;

    const chat = {
      user: `${auth.currentUser.email.slice(0, auth.currentUser.email.indexOf("@"))}`,
      message: newMessage.value,
      createdAt: timestamp,
    };

    await writeDocument("messages", chat);
    await getCollection("messages");

    emit("submitted");
    newMessage.value = "";
    isSending.value = false;
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/style/theme.scss";

form {
  position: relative;
  display: flex;
  align-items: center;
  margin-top: $spacing-xl;

  button {
    position: absolute;
    right: 0;
    border-radius: 0 $border-sm $border-sm 0;
  }
}
</style>
