<template>
  <div class="login">
    <h2>Log in</h2>
    <form @submit.prevent="handleSubmit" :disabled="isValidating">
      <!-- email -->
      <div class="email">
        <label for="email">email</label>
        <input v-model="email" type="text" name="email" placeholder="email" />
      </div>
      <!-- password -->
      <div class="password">
        <label for="password">password</label>
        <input v-model="password" type="password" name="password" placeholder="password" />
      </div>
      <!-- error -->
      <div v-if="errorCode" class="error">{{ errorCode }}</div>

      <!-- submit -->
      <div class="submit">
        <button type="submit">log in</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { signInUser, errorCode, isValidating, email, password } from "../composables/login-service";

const handleSubmit = async function () {
  isValidating.value = true;
  errorCode.value = "";
  await signInUser(email.value, password.value);
};
</script>

<style scoped></style>
