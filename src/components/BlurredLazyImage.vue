<template>
  <div class="fade-in">
    <img :src="src" :alt="alt" loading="lazy" />
    <img class="blurred-shadow" :src="src" :alt="alt" loading="lazy" />
  </div>
</template>

<script setup>
import { initTransitions } from "../composables/transitions";
import { defineProps } from "vue";

initTransitions();
defineProps({
  src: String,
  alt: String,
});
</script>

<style lang="scss" scoped>
img:first-child {
  z-index: 1;
}
.blurred-shadow {
  filter: blur(80px);
  opacity: 0.5;
}
</style>
