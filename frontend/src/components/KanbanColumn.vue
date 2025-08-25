<template>
  <div
      class="kanban-board__col flex-fill"
      @dragover.prevent
      @drop="onDrop"
  >
    <div class="kanban-board__card shadow-sm h-100 rounded-3">
      <div class="kanban-board__header p-3 d-flex align-items-center fw-bold rounded-3">
        <div class="kanban-board__header-text mx-2">{{ props.statusStrings.pageString }} <span>({{ kanbanCards.length }})</span></div>
      </div>
      <KanbanCard
          v-for="card in props.kanbanCards"
          :data="card"
          :key="card._id"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import KanbanCard from "@/components/KanbanCard.vue";
  import type { KanbanStatusStrings } from "@/model/KanbanStatusStrings";
  import { useKanbanStore } from "@/stores/kanbanStore";

  const props = defineProps<{
    statusStrings: KanbanStatusStrings;
    kanbanCards: KanbanCard[];
  }>();

  const kanbanStore = useKanbanStore();

  async function onDrop(event: DragEvent) {
    const card: KanbanCard = kanbanStore.draggingCard;

    if (!card) {
      return;
    }

    const updatedCard = {
      title: card.title,
      content: card.content,
      state: props.statusStrings.apiString
    };

    await kanbanStore.createOrUpdateKanbanCard(updatedCard, card._id);

    await kanbanStore.getAllKanbanCards();
  }
</script>

<style scoped>
  .kanban-board__card {
    background: rgb(243, 243, 243);
  }
</style>