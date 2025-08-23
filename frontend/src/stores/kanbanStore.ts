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

  const state: Ref<KanbanCard[]> = ref<KanbanCard[]>( [
      {
        id: "1",
        title: "1",
        content: "1",
        status: "todo"
      },
      {
        id: "2",
        title: "2",
        content: "2",
        status: "in-progress"
      },
      {
        id: "3",
        title: "3",
        content: "3",
        status: "done"
      },
      {
        id: "4",
        title: "4",
        content: "4",
        status: "todo"
      }
    ]);

  const draggingId: Ref<string> = ref("-1");

  function setDraggingId(id: string): void {
    draggingId.value = id;
  }

  async function test(): Promise<KanbanCard[]> {
    return state.value;
  }

  function getKanbanStates(): KanbanStatusStrings[] {
    return kanbanStates.value;
  }

  function updateCardStatus(cardId: string, statusString: string): void {
    for(const card of state.value) {
      if(card.id == cardId) {
        card.status = statusString;
        break;
      }
    }
  }

  async function getAllKanbanCards(): Promise<any> {
    error.value = null;
    const data: Ref<KanbanCard[]> = ref<KanbanCard[]>([]);

    try {
      data.value = await request.plainRequest(config.backendUrl + "/kanban/get-all-kanban-cards", { method: "GET" });

    } catch (err: any) {
      error.value = "Došlo k neočekávané chybě.";
    }

    return { err: error.value, data: data.value };
  }

  async function getKanbanCardById(id: string): Promise<{err: string, data: any}> {
    error.value = null;
    const data: Ref<KanbanCard | null> = ref<KanbanCard | null>(null);

    try {
      data.value = await request.plainRequeset(config.backendUrl + "/kanban/get-kanban-card/" + id, { method: "GET" });

    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        error.value = "Kanbanová kartička nebyla nalezena.";
      } else {
        error.value = "Došlo k neočekávané chybě.";
      }
    }

    return { err: error.value, data: data.value };
  }

  async function createOrUpdateKanbanCard(data: KanbanCard): Promise<any> {
    error.value = null;

    try {
      if(data.id == -1) {
        await request.plainRequeset(config.backendUrl + "/kanban/create-kanban-card", { method: "POST", data: data });

      } else {
        await request.plainRequeset(config.backendUrl + "/kanban/update-kanban-card/" + data.id_age_category, { method: "PUT", data: data });
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
      await request.plainRequeset(config.backendUrl + "/kanban/delete-kanban-card/" + id, { method: "DELETE" });

    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        error.value = "Kanbanová kartička nebyla nalezena.";
      } else {
        error.value = "Došlo k neočekávané chybě.";
      }
    }

    return { err: error.value };
  }

  return { getAllKanbanCards, getKanbanCardById, createOrUpdateKanbanCard, deleteKanbanCard, test, getKanbanStates, updateCardStatus, setDraggingId, draggingId }
})
