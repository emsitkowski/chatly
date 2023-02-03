<template>
  <AuthForm type="register">
    <template v-slot:header>Register</template>
    <template v-slot:buttonText>create an account</template>
  </AuthForm>
  <router-link to="/" class="link">Log in</router-link>
</template>

<script setup>
import AuthForm from "../components/AuthForm.vue";
</script>

<style lang="scss" scoped></style>
