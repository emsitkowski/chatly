<template>
  <div class="auth">
    <form @submit.prevent="onSubmit">
      <!-- header -->
      <h2>
        <slot name="header"></slot>
      </h2>
      <!-- email -->
      <div class="email">
        <label for="email">email</label>
        <input v-model="email" type="text" name="email" placeholder="email" :disabled="isValidating" />
      </div>
      <!-- password -->
      <div class="password">
        <label for="password">password</label>
        <input v-model="password" type="password" name="password" placeholder="password" :disabled="isValidating" />
      </div>
      <!-- error -->
      <div v-if="authError" class="error">{{ authError }}</div>

      <!-- submit -->
      <div class="submit">
        <button type="submit">
          <slot name="buttonText"></slot>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { signInUser } from "../composables/login-service";
import { signUpUser } from "../composables/signup-service";

const email = ref("");
const password = ref("");
const isValidating = ref(false);
const authError = ref();

const props = defineProps({
  type: String,
});

async function onSubmit() {
  isValidating.value = true;
  if (props.type == "login") {
    await signInUser(email.value, password.value);
  } else if (props.type == "register") {
    await signUpUser(email.value, password.value);
  }

  authError.value = "failed to authenticate, please try again";
  isValidating.value = false;
  email.value = "";
  password.value = "";
}
</script>

<style scoped>
.auth {
  background-color: #edf2f4;
  border-radius: 16px;
  padding: 32px 0;
  width: 364px;
  max-width: 100%;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

form input:disabled {
  opacity: 0.6;
}

form input {
  border: none;
  padding: 12px;
  border-radius: 8px;
  background-color: #fff;
}

form label {
  margin-bottom: 6px;
  font-size: 14px;
  text-align: start;
  font-weight: 300;
}
.email,
.password {
  display: flex;
  flex-direction: column;
}

.email {
  margin-bottom: 16px;
}
.submit button {
  margin-top: 24px;
  border: none;
  background: #2b2d42;
  color: #fff;
  padding: 12px 32px;
  border-radius: 8px;
  opacity: 0.8;
  cursor: pointer;
}

.submit button:hover {
  opacity: 1;
}

.error {
  margin-top: 8px;
  color: #d90429;
  font-size: 12px;
}
</style>
