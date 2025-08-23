<template>
  <div class="kanban-board__col flex-fill">
    <div class="kanban-board__card shadow-sm h-100 rounded-3">
      <div class="kanban-board__header p-3 d-flex align-items-center fw-bold rounded-3">
        <div class="kanban-board__header-text mx-2">{{ props.title }} <span>({{ props.active }})</span></div>
      </div>
      <KanbanCard :title="'Content todo1 title'" :content="'Content todo1 text'"/>
    </div>
  </div>
</template>

<script setup lang="ts">
  import KanbanCard from "@/components/KanbanCard.vue";

  const props = defineProps<{
    title: string;
    active: number;
    kanbanCards: KanbanCard[];
  }>();
</script>

<style scoped>
  .kanban-board__card {
    background: rgb(243, 243, 243);
  }
</style>