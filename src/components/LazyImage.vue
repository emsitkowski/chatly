<template>
  <img class="fade-in" :src="src" :alt="alt" loading="lazy" />
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

<style lang="scss" scoped></style>
