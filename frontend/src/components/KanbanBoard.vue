<template>
  <div class="kanban-board container-fluid py-3 d-flex gap-4" :class="{'h-100 justify-content-center align-items-center': isLoading }">
    <KanbanRow :title="'TO DO'" :active="6" :kanban-cards="[]"/>
  </div>
</template>

<script setup lang="ts">
  import KanbanRow from "@/components/KanbanRow.vue";
</script>

<style scoped>

</style>