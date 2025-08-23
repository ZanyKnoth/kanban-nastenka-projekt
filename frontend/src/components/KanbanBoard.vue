<template>
  <div class="kanban-board container-fluid py-3 d-flex gap-4" :class="{'h-100 justify-content-center align-items-center': isLoading }">
    <Loading v-if="isLoading" />
    <KanbanRow v-else v-for="status in kanbanStates" :statusStrings="status" :kanban-cards="filterKanbanCardsByStatus(status.apiString)"/>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import type { Ref } from "vue";
  import KanbanRow from "@/components/KanbanRow.vue";
  import Loading from "@/components/Loading.vue";
  import KanbanCard from "@/components/KanbanCard.vue";
  import type { KanbanStatusStrings } from "@/model/KanbanStatusStrings";
  import { useKanbanStore } from "@/stores/kanbanStore";

  const kanbanStore = useKanbanStore();

  const isLoading: Ref<boolean> = ref<boolean>(true);
  const loadingError: Ref<string | null> = ref<string | null>(null);
  const kanbanStates: Ref<KanbanStatusStrings[]> = ref<KanbanStatusStrings[]>([]);
  const kanbanData: Ref<KanbanCard[]> = ref<KanbanCard[]>([]);

  function filterKanbanCardsByStatus(status: string) {
    return kanbanData.value.filter((card: KanbanCard): boolean => card.status == status);
  }

  onMounted(async () => {

    kanbanStates.value = kanbanStore.getKanbanStates();
    kanbanData.value = await kanbanStore.test();

    isLoading.value = false;
  });
</script>

<style scoped>

</style>