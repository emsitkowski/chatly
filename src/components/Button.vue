<template>
  <button :class="class">
    <span v-if="text">
      {{ text }}
    </span>
    <slot name="icon"></slot>
    <slot name="loader"></slot>
  </button>
</template>

<script setup>
const props = defineProps({
  text: String,
  class: String,
});
</script>

<style lang="scss" scoped>
@import "../assets/style/theme.scss";

button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: none;
  padding: $spacing-lg $spacing-xl;
  border-radius: $border-sm;
  opacity: 1;
  font-size: 1.6rem;
  font-weight: 300;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    opacity: 0.8;
  }

  &:focus {
    outline: 2px solid #c7c7c7;
    background: #fff;
    border-radius: $border-sm;
  }

  &.primary {
    background: $gradient-primary;
    color: $gray-100;
  }

  &.secondary {
    background: $gray-200;
    color: rgba(51, 51, 51, 0.6);
  }

  &.square {
    background: $gradient-primary;
    width: unset;
    padding: 12px;
    width: 44px;
    height: 44px;
  }

  &[disabled] {
    pointer-events: none;
  }
}
</style>
