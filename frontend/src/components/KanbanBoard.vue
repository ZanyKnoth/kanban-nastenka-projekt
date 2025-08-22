<template>
  <div class="kanban-board container-fluid py-3 d-flex gap-4">
    <div class="kanban-board__col flex-fill">
      <div class="kanban-board__card card shadow-sm h-100 rounded-3">
        <div class="kanban-board__header p-3 d-flex align-items-center bg-light fw-bold rounded-3">
          <div class="kanban-board__header-text mx-2">TODO <span>(6)</span></div>
        </div>
        <CanbanCard :title="'Content todo1 title'" :content="'Content todo1 text'"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import CanbanCard from "@/components/KanbanCard.vue";
</script>

<style scoped>

</style>