<template>
  <div
      class="kanban-board__body pt-0 py-2 px-1 d-flex flex-column gap-2 rounded-3"
      draggable="true"
      @dragstart="onDragStart"
      @dragend="onDragEnd"
      :class="{ 'opacity-50': isDraggingMe }"
  >
    <div class="kanban-board__body-wrapper card p-2 shadow-sm">
      <div class="kanban-board__body-title fw-semibold h5">{{ props.data.title }}</div>
      <span class="kanban-board__body-content mt-1 h6">{{ props.data.content }}</span>
      <div class="kanban-board__link-wrapper d-flex justify-content-end">
        <router-link class="badge bg-dark p-2 link-underline link-underline-opacity-0" :to="{ name: 'task', params: { id: props.data._id } }">></router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from "vue";
  import type { Ref } from "vue";
  import type { KanbanCard } from "@/model/KanbanCard";
  import { useKanbanStore } from "@/stores/kanbanStore";

  const props = defineProps<{
    data: KanbanCard
  }>();

  const kanbanStore = useKanbanStore();
  const clone: Ref<HTMLElement | null> = ref<HTMLElement | null>(null);

  function onDragStart(event: DragEvent) {
    if (!event.dataTransfer) {
      return;
    }

    kanbanStore.setDraggingCard(props.data);

    const node: HTMLElement = event.currentTarget as HTMLElement;
    const rect: DOMRect = node.getBoundingClientRect();

    clone.value = node.cloneNode(true) as HTMLElement;

    clone.value.style.width = rect.width / 2 + "px";
    clone.value.style.height = rect.height / 2 + "px";

    clone.value.style.position = "absolute";
    clone.value.style.top = "-9999px";
    clone.value.style.left = "-9999px";
    clone.value.style.opacity = "1";

    document.body.appendChild(clone.value);

    event.dataTransfer.setDragImage(clone.value, rect.width / 2 / 2, rect.height / 2 / 2);
  }

  function onDragEnd() {
    kanbanStore.setDraggingCard(null);

    document.body.removeChild(clone.value);
  }

  const isDraggingMe = computed(() => kanbanStore.draggingCard?.value?._id === props.data._id);
</script>

<style scoped>

</style>