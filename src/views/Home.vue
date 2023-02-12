<template>
  <div class="container-full">
    <AuthSection type="login">
      <template v-slot:header>Log in</template>
      <template v-slot:subheader>Join the chatroom and meet awesome people just now!</template>
      <template v-slot:button>
        <Button type="submit" text="Log in" class="primary" />
        <router-link to="/register">
          <Button text="Create an account" class="secondary" />
        </router-link>
      </template>
      <template v-slot:image>
        <LazyImage src="../src/assets/img/friends.jpg" alt="Friends"></LazyImage>
      </template>
    </AuthSection>
  </div>
</template>

<script setup>
import AuthSection from "../components/AuthSection.vue";
import Button from "../components/Button.vue";
import LazyImage from "../components/LazyImage.vue";
</script>

<style lang="scss" scoped></style>
