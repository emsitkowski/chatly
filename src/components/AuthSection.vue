<template>
  <div class="auth">
    <form class="auth__form" @submit.prevent="onSubmit">
      <!-- header -->
      <h2>
        <slot name="header"></slot>
      </h2>
      <!-- subheader -->
      <p>
        <slot name="subheader"></slot>
      </p>
      <!-- email -->
      <div class="email">
        <label for="email">email</label>
        <input v-model="email" type="text" name="email" placeholder="enter your email" :disabled="isValidating" />
      </div>
      <!-- password -->
      <div class="password">
        <label for="password">password</label>
        <input v-model="password" type="password" name="password" placeholder="enter your password" :disabled="isValidating" />
      </div>
      <!-- error -->
      <div class="error">
        <p>
          {{ authError }}
        </p>
      </div>

      <!-- submit -->
      <div class="submit">
        <slot name="button"></slot>
      </div>
    </form>

    <!-- image -->
    <div class="auth__image"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { signInUser } from "../composables/login-service";
import { signUpUser } from "../composables/signup-service";
import Button from "../components/Button.vue";

const email = ref("");
const password = ref("");
const isValidating = ref(false);
const authError = ref();

const props = defineProps({
  type: String,
});

async function onSubmit() {
  isValidating.value = true;
  authError.value = "";

  try {
    if (props.type == "login") {
      await signInUser(email.value, password.value);
    } else if (props.type == "register") {
      await signUpUser(email.value, password.value);
    }
  } catch (error) {
    isValidating.value = false;
    authError.value = error.message;
  }
}
</script>

<style lang="scss">
@import "../assets/style/theme.scss";

.auth {
  display: flex;
  width: 100%;
  max-width: 768px;
  background-color: $gray-100;
  border-radius: $border-md;
  overflow: hidden;

  &__form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: $spacing-2xl;
    flex-basis: 50%;

    h2 {
      margin-bottom: $spacing-md;
    }

    p {
      margin-bottom: $spacing-xl;
    }

    .email,
    .password {
      display: flex;
      flex-direction: column;
    }

    .email {
      margin-bottom: 16px;
    }

    .error {
      height: 16px;
      margin-top: 8px;
      color: #d90429;

      p {
        font-size: 12px;
      }
    }

    .submit {
      display: flex;
      flex-direction: column;
      gap: $spacing-lg;
      margin-top: $spacing-xl;
    }
  }

  &__form input:disabled {
    opacity: 0.6;
  }

  &__form input {
    border: none;
    padding: 12px;
    border-radius: $border-sm;
    background-color: #fff;

    &::placeholder {
      font-size: 1.4rem;
      opacity: 0.4;
    }
  }

  &__form label {
    margin-bottom: 6px;
    font-size: 1.4rem;
    text-align: start;
    font-weight: 300;
  }

  &__image {
    background: url("@/assets/img/girl-on-the-blue-wall.jpg") no-repeat 50%;
    background-size: cover;
    margin: $spacing-xl $spacing-xl $spacing-xl 0;
    border-radius: $border-md;
    flex-basis: 50%;
  }
}
</style>