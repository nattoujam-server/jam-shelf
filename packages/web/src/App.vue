<script setup lang="ts">
import { RouterView } from 'vue-router'

import NavBar from '@/components/NavBar.vue'
</script>

<template>
  <header class="hero is-small">
    <div class="hero-body">
      <NavBar />
    </div>
  </header>

  <main class="container">
    <RouterView />
  </main>
</template>

<style scoped>
main {
  max-width: 1240px;
  padding: 0 2rem 2rem 2rem;
}
</style>
