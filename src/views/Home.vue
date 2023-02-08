<template>
  <div class="homescreen">
    <h1>Get started</h1>
    <AuthForm type="login">
      <template v-slot:header>Join the chatroom</template>
      <template v-slot:buttonText>log in</template>
    </AuthForm>
    <router-link to="/register" class="link">Create an account</router-link>
  </div>
</template>

<script setup>
import AuthForm from "../components/AuthForm.vue";
</script>

<style lang="scss" scoped></style>
