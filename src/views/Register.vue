<template>
  <div class="container-full">
    <!--     <h1>Create an account</h1> -->
    <AuthSection type="register">
      <template v-slot:header>Register</template>
      <template v-slot:subheader>Create new account and join our awesome community!</template>
      <template v-slot:button>
        <Button type="submit" text="Create an account" class="primary" />
        <router-link to="/">
          <Button text="Log in" class="secondary" />
        </router-link>
      </template>
    </AuthSection>
  </div>
</template>

<script setup>
import AuthSection from "../components/AuthSection.vue";
import Button from "../components/Button.vue";
</script>

<style lang="scss" scoped></style>
