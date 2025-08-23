<template>
  <div class="kanban-board__col flex-fill">
    <div class="kanban-board__card shadow-sm h-100 rounded-3">
      <div class="kanban-board__header p-3 d-flex align-items-center fw-bold rounded-3">
        <div class="kanban-board__header-text mx-2">{{ props.title }} <span>({{ kanbanCards.length }})</span></div>
      </div>
      <KanbanCard v-for="card in props.kanbanCards" :title="card.title" :content="card.content"/>
    </div>
  </div>
</template>

<script setup lang="ts">
  import KanbanCard from "@/components/KanbanCard.vue";

  const props = defineProps<{
    title: string;
    kanbanCards: KanbanCard[];
  }>();
</script>

<style scoped>
  .kanban-board__card {
    background: rgb(243, 243, 243);
  }
</style>