<template>
  <div v-if="isLoading" class="loader">
    <div class="loader__spinner"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  isLoading: Boolean,
});
</script>

<style lang="scss" scoped>
@import "../assets/style/theme.scss";

.loader {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.6);
  z-index: 10;

  &__spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 48px;
    height: 48px;
    border: 5px solid $primary-100;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 0.8s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
}
</style>
