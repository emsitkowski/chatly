<template>
  <div class="container-full">
    <!-- TODO: add user name here -->
    <!--     <h1>Welcome back, 'user'</h1> -->
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
      <NewChatForm @messageSent="handleNewMessage" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getCollection, documents, areAllMessagesLoaded, numOfMessagesCurrentlyLoaded } from "../composables/db-get-collection";
import { initTransitions } from "../composables/transitions";
import NewChatForm from "../components/NewChatForm.vue";
import Loader from "../components/Loader.vue";

const chatWindow = ref();
const isLoading = ref(true);
const messagesLimit = ref(6);

initTransitions();

onMounted(async () => {
  // fetch messages
  await getCollection("messages", messagesLimit.value);

  // scroll chat window to bottom on mount & resize
  await scrollToBottom();
  window.addEventListener("resize", scrollToBottom);

  toggleLoading();

  loadMoreMessages();
});

function toggleLoading() {
  // toggle loading
  isLoading.value = isLoading.value != true;
}

// Toggle chat window loading
async function handleNewMessage() {
  numOfMessagesCurrentlyLoaded.value++;
  toggleLoading();

  // fetch messages
  await getCollection("messages", numOfMessagesCurrentlyLoaded.value);

  // scroll to bottom
  scrollToBottom();

  // toggle loading
  toggleLoading();
}

function loadMoreMessages() {
  chatWindow.value.addEventListener("scroll", async () => {
    let currentScrollPos = chatWindow.value.scrollTop;

    if (currentScrollPos == 0 && !areAllMessagesLoaded.value) {
      isLoading.value = true;

      // get chat window initial height
      const initialHeight = chatWindow.value.scrollHeight;

      await getCollection("messages", numOfMessagesCurrentlyLoaded.value + messagesLimit.value);

      // get chat window new height
      const newHeight = chatWindow.value.scrollHeight;

      // calculate difference between new height & initial height to calc scroll pos before loading more messages
      const calcNewHeight = newHeight - initialHeight;

      // update scroll position to previous state
      chatWindow.value.scrollTo(0, calcNewHeight);

      isLoading.value = false;
    }
  });
}

// scroll chat window to bottom
async function scrollToBottom() {
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
      display: flex;
      flex-direction: column-reverse;
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
