<template>
  <Header />
  <main class="main">
    <RouterView />
  </main>
  <Footer />
</template>

<script setup lang="ts">
  import Header from "@/components/Header.vue";
  import Footer from "@/components/Footer.vue";
</script>

<style scoped>

</style>
