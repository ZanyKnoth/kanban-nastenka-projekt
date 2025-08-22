<template>
  <div class="kanban-board container-fluid py-3 d-flex gap-4">
    <KanbanRow :title="'TO DO'" :active="6">
      <template #kanban-cards>
        <KanbanCard :title="'Content todo1 title'" :content="'Content todo1 text'"/>
        <KanbanCard :title="'Content todo1 title'" :content="'Content todo1 text'"/>
      </template>
    </KanbanRow>
  </div>
</template>

<script setup lang="ts">
  import KanbanRow from "@/components/KanbanRow.vue";
  import KanbanCard from "@/components/KanbanCard.vue";
</script>

<style scoped>

</style>