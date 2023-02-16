<template>
  <form @submit.prevent="handleSubmit">
    <input
      type="text"
      name="new"
      placeholder="new message"
      v-model="newMessage"
      autocomplete="off"
      ref="newMessageElement"
      maxlength="640"
      @input="updateCharCounter"
      :disabled="isSending"
    />

    <Button class="square" isLoading>
      <template v-slot:loader>
        <Loader v-show="isSending" isLoading class="loader" />
      </template>
      <template v-slot:icon>
        <img v-show="!isSending" src="@/assets/img/paper-plane-outline.svg" alt="paper plane" />
      </template>
    </Button>
    <p class="character-counter">{{ charCount }} / 640</p>
  </form>
</template>

<script setup>
import { ref, nextTick, onMounted } from "vue";
import { writeDocument } from "../composables/db-write-document";
import { auth, timestamp } from "./../config/firebase";
import Button from "../components/Button.vue";
import Loader from "../components/Loader.vue";

const newMessage = ref();
const newMessageElement = ref();
const isSending = ref();
const charCount = ref(0);

// autofocus
onMounted(() => {
  nextTick(() => {
    newMessageElement.value.focus();
  });
});

function updateCharCounter() {
  charCount.value = newMessage.value.length;
}

const emit = defineEmits(["messageSent"]);
async function handleSubmit() {
  if (newMessage.value.length > 0) {
    isSending.value = true;
    const chat = {
      user: `${auth.currentUser.email.slice(0, auth.currentUser.email.indexOf("@"))}`,
      message: newMessage.value,
      createdAt: timestamp,
    };

    await writeDocument("messages", chat);
    emit("messageSent");

    isSending.value = false;
    newMessage.value = "";
    charCount.value = 0;
    newMessageElement.value.focus();
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

  input {
    padding: 12px 54px 12px 12px;
  }

  button {
    position: absolute;
    right: 0;
    border-radius: 0 $border-sm $border-sm 0;
  }
}

.character-counter {
  position: absolute;
  font-size: 12px;
  right: 50px;
  bottom: 4px;
  opacity: 0.4;
}

.loader {
  background: transparentize($color: $gray-100, $amount: 0.6);
  :deep(.loader__spinner) {
    width: 22px;
    height: 22px;
    border: 2px solid #fff;
    border-bottom-color: transparent;
  }
}
</style>
