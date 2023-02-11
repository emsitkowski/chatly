<template>
  <div class="container-full">
    <h1>Welcome to the chatroom</h1>
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

<style lang="scss" scoped>
@import "../assets/style/theme.scss";
.chatroom {
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  max-width: 768px;
  background-color: $gray-100;
  border-radius: $border-md;
  overflow: hidden;
  @media (min-width: $sm) {
    flex-direction: row;
  }
}

.inner-wrapper {
  padding: $spacing-2xl;
}
</style>
