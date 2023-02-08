<template>
  <div class="container-full">
    <h1>Get started</h1>
    <AuthSection type="register">
      <template v-slot:header>Register</template>
      <template v-slot:buttonText>create an account</template>
    </AuthSection>
  </div>
</template>

<script setup>
import AuthSection from "../components/AuthSection.vue";
</script>

<style lang="scss" scoped></style>
