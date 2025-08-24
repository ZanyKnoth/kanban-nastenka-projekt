<template>
  <div class=" task d-flex flex-column flex-fill p-3">
    <BackButton :link="'/'"/>
    <div class="task__wrapper d-flex flex-column align-items-center flex-fill" :class="{ 'justify-content-center': isLoading }">
      <Loading v-if="isLoading"/>
      <div v-else class="task__content d-flex flex-column flex-fill">
        <div v-if="!loadingError" class="task__container p-2 d-flex flex-column align-items-center">
          <Banner v-if="errors.length > 0" :messages="errors" :type="'error'"/>
          <Form
              :content="formData"
              :btn-text="route.params.id != '-1' ? 'Upravit kartičku' : 'Založit kartičku'"
              @form-submit="addOrUpdateTask"
          >
            <template v-if="route.params.id != '-1'" #extra-buttons>
              <button class="form__button form__button--delete btn btn-danger" @click="deleteTask">Smazat kartičku
              </button>
            </template>
          </Form>
        </div>
        <div v-else class="task__error d-flex flex-fill flex-column align-items-center flex-fill justify-content-center">
          <p>Kartička nebyla nalezena.</p>
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
  import Banner from "@/components/Banner.vue";

  const route = useRoute();
  const router = useRouter();
  const kanbanStore = useKanbanStore();

  const isLoading: Ref<boolean> = ref<boolean>(true);
  const loadingError: Ref<string | null> = ref<string | null>(null);
  const errors: Ref<string[]> = ref<string[]>([]);
  const cardData: Ref<KanbanCard | null> = ref<KanbanCard | null>(null);

  const formData: Ref<ObjectType> = ref<ObjectType>({
    data: [
      {
        formLabel: "id",
        value: "-1",
        type: "hidden",
        key: "id"
      },
      {
        formLabel: "Název",
        value: "",
        type: "text",
        key: "title"
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
    const { err, data } = await kanbanStore.getKanbanCardById(route.params.id as string);

    if (!err) {
      cardData.value = data;

      let i = 0;

      for (const info in cardData.value) {
        if (i < formData.value.data.length) {
          if (cardData.value) {
            formData.value.data[i].value = cardData.value?.[info as keyof KanbanCard] ?? null;
          }
          i++;
        }
      }
    } else {
      loadingError.value = err;
    }
  }

  async function addOrUpdateTask() {
    errors.value = [];

    const data: Ref<KanbanCard> = ref<KanbanCard>({})

    for (const info of formData.value.data) {
        if (info.key != "id") {
          (data.value as any)[info.key as keyof KanbanCard] = info.value;
        }
      }

    const { err } = await kanbanStore.createOrUpdateKanbanCard(data.value, route.params.id);

    if (!err) {
      await router.push("/");
    } else {
      errors.value.push(err);
    }

    console.log(data.value)
  }

  async function deleteTask() {
    const { err: err } = await kanbanStore.deleteKanbanCard(route.params.id);

    if (!err) {
      await router.push("/");
    }
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
        key: "state",
        choices: selectChoices
      });

      await fetchData();
    }

    isLoading.value = false;
  });
</script>

<style scoped>

</style>