import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import config from "@/config";
import { useRequest } from "@/composables/useRequest";
import type { KanbanCard } from "@/model/KanbanCard";
import type { ErrorStatus } from "@/model/ErrorStatus";
import type { KanbanStatusStrings } from "@/model/KanbanStatusStrings";

export const useKanbanStore = defineStore('kanbanStore', () => {
  const request = useRequest();

  const error: Ref<string | null> = ref<string | null>(null);
  const kanbanStates: Ref<KanbanStatusStrings[]> = ref<KanbanStatusStrings[]>([
    {
      apiString: "todo",
      pageString: "TO DO"
    },
    {
      apiString: "in-progress",
      pageString: "IN PROGRESS"
    },
    {
      apiString: "done",
      pageString: "DONE"
    }
  ]);

  const draggingCard: Ref<KanbanCard | null> = ref(null);
  const kanbanCards: Ref<KanbanCard[]> = ref([]);

  function setDraggingCard(card: KanbanCard | null): void {
    draggingCard.value = card;
  }

  function getKanbanStates(): KanbanStatusStrings[] {
    return kanbanStates.value;
  }

  async function getAllKanbanCards(): Promise<any> {
    error.value = null;

    try {
      kanbanCards.value = await request.plainRequest(config.backendUrl + "/tasks", { method: "GET" });

    } catch (err: any) {
      error.value = "Došlo k neočekávané chybě.";
    }

    return { err: error.value, data: kanbanCards.value };
  }

  async function getKanbanCardById(id: string): Promise<{err: string, data: any}> {
    error.value = null;
    const data: Ref<KanbanCard | null> = ref<KanbanCard | null>(null);

    try {
      data.value = await request.plainRequest(config.backendUrl + "/tasks/" + id, { method: "GET" });

    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        error.value = "Kanbanová kartička nebyla nalezena.";
      } else {
        error.value = "Došlo k neočekávané chybě.";
      }
    }

    return { err: error.value, data: data.value };
  }

  async function createOrUpdateKanbanCard(data: KanbanCard, id: string): Promise<any> {
    error.value = null;

    try {
      if(id == "-1") {
        await request.plainRequest(config.backendUrl + "/tasks", { method: "POST", data: data });

      } else {
        await request.plainRequest(config.backendUrl + "/tasks/" + id, { method: "PUT", data: data });
      }
    } catch (err: any) {
      if (err.response) {
        const errors: ErrorStatus = {
          "404": "Kanbanová kartička nebyla nalezena.",
          "400": "Chyba při vytváření kanbanové kartičky (název nemůže být prázdný, ...)."
        }

        error.value = errors[err.response.status.toString()];
      } else {
        error.value = "Došlo k neočekávané chybě.";
      }
    }

    return { err: error.value };
  }

  async function deleteKanbanCard(id: string): Promise<any> {
    error.value = null;

    try {
      await request.plainRequest(config.backendUrl + "/tasks/" + id, { method: "DELETE" });

    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        error.value = "Kanbanová kartička nebyla nalezena.";
      } else {
        error.value = "Došlo k neočekávané chybě.";
      }
    }

    return { err: error.value };
  }

  return { getAllKanbanCards, getKanbanCardById, createOrUpdateKanbanCard, deleteKanbanCard, getKanbanStates, setDraggingCard, draggingCard, kanbanCards }
})
