<template>
  <div class="back-link">
  <component :is="typeof(link) == 'string' ? 'RouterLink' : 'router-link'" :to="link" class="back-link__link link-underline link-underline-opacity-0">
    <font-awesome-icon :icon="['fa', 'arrow-left']" class="back-link__icon "/>
    <span class="back-link__link-text h6">Zpět</span>
  </component>
  </div>
</template>

<script setup lang="ts">
  import type { LinkObject } from "@/model/LinkObject";

  defineProps<{
    link: string | LinkObject;
  }>()
</script>

<style scoped>

</style>