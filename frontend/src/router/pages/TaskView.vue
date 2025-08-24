<template>
  <div class=" task d-flex flex-column flex-fill p-3">
    <BackButton :link="'/'"/>
    <div class="task__wrapper d-flex flex-column align-items-center flex-fill" :class="{ 'justify-content-center': isLoading }">
      <Loading v-if="isLoading"/>
      <div v-else class="task__content">
        <div v-if="!loadingError" class="task__container p-2">
          <Form
              :content="formData"
              :btn-text="route.params.id != '-1' ? 'Upravit kartičku' : 'Založit kartičku'"
              @form-submit="addTask"
          >
            <template v-if="route.params.id != '-1'" #extra-buttons>
              <button class="form__button form__button--delete btn btn-danger" @click="deleteTask">Smazat kartičku
              </button>
            </template>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import type { Ref } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import Loading from "@/components/Loading.vue";
  import Form from "@/components/Form.vue";
  import { useKanbanStore } from "@/stores/kanbanStore";
  import type { ObjectType } from "@/model/Form";
  import type { SelectChoice } from "@/model/SelectChoice";
  import type { KanbanCard } from "@/model/KanbanCard";
  import BackButton from "@/components/BackButton.vue";

  const route = useRoute();
  const router = useRouter();
  const kanbanStore = useKanbanStore();

  const isLoading: Ref<boolean> = ref<boolean>(true);
  const loadingError: Ref<string | null> = ref<string | null>(null);
  const taskData: Ref<KanbanCard | null> = ref<KanbanCard | null>(null);

  const formData: Ref<ObjectType> = ref<ObjectType>({
    data: [
      {
        formLabel: "id",
        value: -1,
        type: "hidden",
        key: "id_age_category"
      },
      {
        formLabel: "Název",
        value: "",
        type: "text",
        key: "name"
      },
      {
        formLabel: "Obsah",
        value: "",
        type: "textarea",
        key: "content"
      },
    ]
  });

  async function fetchData() {
    taskData.value = await kanbanStore.test();
    let task: KanbanCard | null = null;

    for(const card of taskData.value) {
      if(card.id == route.params.id) {
        task = card;
        break;
      }
    }

    let i = 0;

    for (const info in task) {
      if (i < formData.value.data.length) {
        if (task) {
          formData.value.data[i].value = task?.[info as keyof KanbanCard] ?? null;
        }
        i++;
      }
    }
  }

  function addTask() {

  }

  function deleteTask() {

  }

  onMounted(async () => {
    if(route.params.id != "-1") {
      const selectChoices: SelectChoice[] = [];

      for(const state of kanbanStore.getKanbanStates()) {
        selectChoices.push({
          text: state.pageString,
          value: state.apiString
        });
      }

      formData.value.data.push({
        formLabel: "Stav",
        value: "todo",
        type: "select",
        key: "state_select",
        choices: selectChoices
      });

      await fetchData();
    }

    isLoading.value = false;
  });
</script>

<style scoped>

</style>