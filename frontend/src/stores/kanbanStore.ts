import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import config from "@/config";
import type { KanbanCard } from "@/model/KanbanCard";
import type { ErrorStatus } from "@/model/ErrorStatus";
import { useRequest } from "@/composables/useRequest";

export const useKanbanStore = defineStore('kanbanStore', () => {

})
