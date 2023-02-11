<template>
  <div class="auth">
    <form class="auth__form" @submit.prevent="onSubmit">
      <Loader :isLoading="isValidating" transparent />
      <!-- header -->
      <h2 class="fade-in">
        <slot name="header"></slot>
      </h2>
      <!-- subheader -->
      <p class="fade-in">
        <slot name="subheader"></slot>
      </p>
      <!-- email -->
      <div class="email fade-in">
        <label for="email">email</label>
        <input v-model="email" type="text" name="email" placeholder="enter your email" :disabled="isValidating" />
      </div>
      <!-- password -->
      <div class="password fade-in">
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
    <div class="auth__image">
      <slot name="image"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { signInUser } from "../composables/login-service";
import { signUpUser } from "../composables/signup-service";
import Loader from "../components/Loader.vue";
import { initTransitions } from "../composables/transitions";

const email = ref("");
const password = ref("");
const isValidating = ref(false);
const authError = ref();

const props = defineProps({
  type: String,
});

// fire transitions
initTransitions();

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
  flex-direction: column-reverse;
  width: 100%;
  max-width: 768px;
  background-color: $gray-100;
  border-radius: $border-md;
  overflow: hidden;
  @media (min-width: $sm) {
    flex-direction: row;
  }

  &__form {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: $spacing-xl;
    flex-basis: 50%;
    @media (min-width: $sm) {
      padding: $spacing-2xl $spacing-xl;
    }
    @media (min-width: $md) {
      padding: $spacing-2xl;
    }

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

  &__image {
    position: relative;
    margin: $spacing-xl $spacing-xl 0 $spacing-xl;
    border-radius: $border-md;
    flex-basis: 100%;
    min-height: 264px;
    overflow: hidden;
    @media (min-width: $sm) {
      flex-basis: 50%;
      margin: $spacing-xl $spacing-xl $spacing-xl 0;
    }

    img {
      position: absolute;
      width: 100%;
      height: 100%;
      max-height: 264px;
      object-fit: cover;
      object-position: 50% 40%;
      @media (min-width: $sm) {
        max-height: 100%;
        object-position: 50%;
      }
    }
  }
}
</style>
