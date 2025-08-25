<template>
  <div class="kanban-board d-flex flex-column gap-4" :class="{ 'h-100 justify-content-center': isLoading }">
    <div class="kanban-board__button-wrapper p-3 d-flex justify-content-end">
      <router-link class="kanban-board__link btn btn-success" :to="{ name: 'task', params: { id: '-1' } }">Přidat kartičku</router-link>
    </div>
    <div class="kanban-board__board-wrapper p-3 d-flex flex-column flex-md-row gap-4" :class="{ 'h-100 justify-content-center align-items-center': isLoading }">
      <Loading v-if="isLoading" />
      <KanbanColumn
          v-else v-for="state in kanbanStates"
          :statusStrings="state"
          :key="state.apiString"
          :kanban-cards="filterKanbanCardsByStatus(state.apiString)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import type { Ref } from "vue";
  import KanbanColumn from "@/components/KanbanColumn.vue";
  import Loading from "@/components/Loading.vue";
  import KanbanCard from "@/components/KanbanCard.vue";
  import type { KanbanStatusStrings } from "@/model/KanbanStatusStrings";
  import { useKanbanStore } from "@/stores/kanbanStore";

  const kanbanStore = useKanbanStore();

  const isLoading: Ref<boolean> = ref<boolean>(true);
  const kanbanStates: Ref<KanbanStatusStrings[]> = ref<KanbanStatusStrings[]>([]);

  function filterKanbanCardsByStatus(state: string) {
    return kanbanStore.kanbanCards.filter((card: KanbanCard): boolean => card.state == state);
  }

  onMounted(async () => {
    kanbanStates.value = kanbanStore.getKanbanStates();

    await kanbanStore.getAllKanbanCards();

    isLoading.value = false;
  });
</script>

<style scoped>

</style>