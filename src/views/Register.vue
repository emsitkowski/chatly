<template>
  <div class="container-full">
    <AuthSection type="register">
      <template v-slot:header>Register</template>
      <template v-slot:subheader>Create new account and join our awesome community!</template>
      <template v-slot:button>
        <Button type="submit" text="Create an account" class="primary" />
        <router-link to="/">
          <Button text="Log in" class="secondary" />
        </router-link>
      </template>
      <template v-slot:image>
        <BlurredLazyImage src="/girl-on-the-blue-wall.jpg" alt="Girl on the blue wall"></BlurredLazyImage>
      </template>
    </AuthSection>
  </div>
</template>

<script setup>
import AuthSection from "../components/AuthSection.vue";
import Button from "../components/Button.vue";
import BlurredLazyImage from "../components/BlurredLazyImage.vue";
</script>

<style lang="scss" scoped></style>
