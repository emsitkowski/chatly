<template>
  <div v-if="isLoading" class="loader" :transparent="transparent">
    <div class="loader__spinner"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  isLoading: Boolean,
  transparent: Boolean,
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
  background: $gray-100;
  z-index: 100;

  &[transparent="true"] {
    background: transparentize($color: $gray-100, $amount: 0.4);
  }

  &__spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 48px;
    height: 48px;
    border: 3px solid $primary-100;
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
