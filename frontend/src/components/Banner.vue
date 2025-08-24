<template>
  <div :class="bannerClass">
    <p v-for="message in props.messages" class="my-3">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
  import { computed } from "vue";

  const props = defineProps<{
    messages: string[];
    type: string;
  }>()

  const bannerClass = computed(() => {
    const base = 'd-flex flex-column align-items-center text-center fw-bold rounded py-2 px-4 my-4 w-50'
    const typeClasses = {
      error: 'bg-danger text-white',
      info: 'bg-primary text-white',
    }
    return `${base} ${typeClasses[props.type] || ''}`
  })
</script>