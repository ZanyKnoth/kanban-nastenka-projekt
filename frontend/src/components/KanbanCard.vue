<template>
  <div class="kanban-board__body pt-0 py-2 px-1 d-flex flex-column gap-2 rounded-3">
    <div class="kanban-board__body-wrapper card p-2 shadow-sm">
      <div class="kanban-board__body-title fw-semibold h5">{{ props.title }}</div>
      <span class="kanban-board__body-content mt-1 h6">{{ props.content }}</span>
      <div class="kanban-board__link-wrapper d-flex justify-content-end">
        <div class="badge bg-dark p-2">></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    title: string;
    content: string;
  }>()
</script>

<style scoped>

</style>