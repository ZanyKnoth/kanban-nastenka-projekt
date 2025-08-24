<template>
  <div class="app-container d-flex flex-column min-vh-100">
    <main class="app-container__main d-flex flex-grow-1">
      <div class="app-container__wrapper d-flex flex-grow-1 m-2">
        <RouterView />
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
  import Footer from "@/components/Footer.vue";
</script>

<style scoped>
  .app-container {
    background: rgba(0, 0, 255, .05);
  }
  .app-container__wrapper {
    background: white;
  }
</style>
