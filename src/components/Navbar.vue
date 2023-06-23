<template>
  <nav>
    <router-link to="/">
      <span class="logo">chatly</span>
    </router-link>
  </nav>
</template>

<script setup></script>

<style lang="scss" scoped>
nav {
  position: relative;
  display: flex;
  justify-content: center;
  padding: 24px 12px;
  margin: 0 16px;
  background: rgba(255, 255, 255, 0.06);
  top: 16px;
  border-radius: 16px;
}

.logo {
  font-family: "Unbounded", sans-serif;
  font-size: 5rem;
  color: #fff;
}
</style>
