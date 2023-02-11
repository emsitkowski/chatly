<template>
  <div class="container-full">
    <!-- TODO: add user name here -->
    <h1>Welcome back, 'user'</h1>
    <div class="chatroom">
      <Loader :isLoading="isLoading" />
      <div class="inner-wrapper" ref="chatWindow">
        <div class="messages">
          <div class="messages__item" v-for="doc in documents" :key="doc.message">
            <div class="messages__item-avatar">{{ doc.user.slice(0, 1) }}</div>
            <div class="messages__item-text">
              <span class="messages__item-text-message">
                {{ doc.message }}
              </span>
              <span class="messages__item-text-author">
                {{ doc.user }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <NewChatForm @toggleLoading="toggleLoading" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getCollection, documents } from "../composables/db-get-collection";
import NewChatForm from "../components/NewChatForm.vue";
import Loader from "../components/Loader.vue";

const chatWindow = ref();
const isLoading = ref(true);

onMounted(async () => {
  // fetch all messages
  await getCollection("messages");

  // scroll chat window to bottom on mount & resize
  scrollToBottom();
  window.addEventListener("resize", scrollToBottom);

  toggleLoading();
});

// Toggle chat window loading
function toggleLoading() {
  // toggle loading
  isLoading.value = isLoading.value != true;
}

// scroll chat window to bottom
function scrollToBottom() {
  chatWindow.value.scrollTo(0, chatWindow.value.scrollHeight);
}
</script>

<style lang="scss" scoped>
@import "../assets/style/theme.scss";
.chatroom {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: 768px;
  height: 640px;
  background-color: $gray-100;
  border-radius: $border-md;
  padding: $spacing-2xl;
  overflow: hidden;

  .inner-wrapper {
    width: 100%;
    overflow-y: scroll;

    .messages {
      &__item {
        display: flex;
        align-items: center;
        gap: $spacing-lg;
        padding: $spacing-lg;
        border-radius: $border-md;

        &:nth-child(even) {
          background: rgba(255, 255, 255, 0.6);
        }

        &-avatar {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          height: 46px;
          width: 46px;
          border-radius: $border-sm;
          background: $gray-200;
          font-size: 1.6rem;
          color: lighten($dark-100, 40%);
          text-transform: uppercase;
        }

        &-text {
          display: flex;
          flex-direction: column;
          gap: $spacing-xs;

          &-message {
            font-size: 1.4rem;
          }

          &-author {
            font-size: 1.2rem;
            font-weight: 200;
            color: lighten($dark-100, 40%);
          }
        }
      }
    }
  }
}
</style>
