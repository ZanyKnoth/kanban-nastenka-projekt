<template>
  <div class="kanban-board__col flex-fill">
    <div class="kanban-board__card shadow-sm h-100 rounded-3">
      <div class="kanban-board__header p-3 d-flex align-items-center fw-bold rounded-3">
        <div class="kanban-board__header-text mx-2">{{ props.title }}<span>({{ props.active }})</span></div>
      </div>
      <slot name="kanban-cards"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    title: string;
    active: number;
  }>()
</script>

<style scoped>
  .kanban-board__card {
    background: rgb(243, 243, 243);
  }

</style>