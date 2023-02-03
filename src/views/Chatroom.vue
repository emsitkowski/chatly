<template>
  <h2>Welcome to the chatroom</h2>
  <div class="chatroom">
    <div class="inner-wrapper">
      <div class="messages">
        <div v-for="doc in documents" :key="doc.message">
          <div class="msg">{{ doc.message }}, {{ doc.user }}</div>
        </div>
      </div>
    </div>
    <NewChatForm />
  </div>
</template>

<script setup>
import NewChatForm from "../components/NewChatForm.vue";
import { onMounted } from "vue";
import { getCollection, documents } from "../composables/db-get-collection";

onMounted(() => {
  getCollection("messages");
});
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
</style>
