<template>
  <button :class="class" :disabled="isLoading">{{ text }}</button>
</template>

<script setup>
const props = defineProps({
  text: String,
  class: String,
  isLoading: Boolean,
});
</script>

<style lang="scss" scoped>
@import "../assets/style/theme.scss";

button {
  width: 100%;
  border: none;
  padding: $spacing-lg $spacing-xl;
  border-radius: $border-sm;
  opacity: 1;
  font-size: 1.6rem;
  font-weight: 300;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &.primary {
    background: $gradient-primary;
    color: $gray-100;
  }

  &.secondary {
    background: $gray-200;
    color: rgba(51, 51, 51, 0.6);
  }

  &[disabled] {
    background: black;
  }
}
</style>
