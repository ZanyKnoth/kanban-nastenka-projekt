<template>
  <div class="kanban-board container-fluid py-3 d-flex gap-4" :class="{'h-100 justify-content-center align-items-center': isLoading }">
    <Loading v-if="isLoading" />
    <KanbanRow v-else :title="'TO DO'" :active="6" :kanban-cards="[]"/>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import type { Ref } from "vue";
  import KanbanRow from "@/components/KanbanRow.vue";
  import Loading from "@/components/Loading.vue";

  const isLoading: Ref<boolean> = ref<boolean>(true);
  const loadingError: Ref<string | null> = ref<string | null>(null);

  onMounted(async () => {
    isLoading.value = false;
  });
</script>

<style scoped>

</style>