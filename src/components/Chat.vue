<template>
  <div class="chatroom">
    <Loader :isLoading="isLoading" transparent />
    <div class="inner-wrapper" ref="chatWindow">
      <div class="messages">
        <div class="messages__item" v-for="doc in documents" :key="doc.id">
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
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getCollection, documents, areAllMessagesLoaded, numOfMessagesCurrentlyLoaded } from "../composables/db-get-collection";
import { initTransitions } from "../composables/transitions";
import NewChatForm from "../components/NewChatForm.vue";
import Loader from "../components/Loader.vue";

const chatWindow = ref();
const isLoading = ref(true);
const messagesLimit = ref(20);

initTransitions();

onMounted(async () => {
  // scroll to bottom on mount
  scrollToBottom();

  // fetch messages
  await getCollection("messages", messagesLimit.value);

  // scroll chat window to bottom again when all messages are loaded
  scrollToBottom();

  // keep chat window scrolled bottom on browser resize
  window.addEventListener("resize", scrollToBottom);

  toggleLoading();

  initInfiniteScroll();
});

function toggleLoading() {
  // toggle loading
  isLoading.value = isLoading.value != true;
}

// Toggle chat window loading
async function handleNewMessage() {
  numOfMessagesCurrentlyLoaded.value++;

  // fetch messages
  await getCollection("messages", numOfMessagesCurrentlyLoaded.value);

  // scroll to bottom
  scrollToBottom();
}

function initInfiniteScroll() {
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
  padding: 0 $spacing-lg $spacing-lg $spacing-lg;
  overflow: hidden;
  @media (min-width: $sm) {
    padding: 0 $spacing-2xl $spacing-2xl $spacing-2xl;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0) 70%, $gray-100 100%);
    pointer-events: none;
    user-select: none;
  }

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
            word-break: break-all;
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
