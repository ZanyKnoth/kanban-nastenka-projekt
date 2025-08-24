<template>
  <form class="form" @submit.prevent="send">
    <div
        v-for="(key, index) in props.content.data"
        class="form__item mb-3"
        :key="`form-input-${index}`"
    >
      <label v-if="key.type != 'hidden'" class="form__input-label form-label">{{ key.formLabel }}:</label>
      <input
          v-if="!key.choices && key.type != 'hidden' && key.type != 'textarea'"
          v-model="key.value"
          :type="key.type"
          :class="`form__field form__field--${key.type} form-control`"
      />
      <textarea
          v-else-if="key.type == 'textarea'"
          rows="4"
          cols="50"
          v-model="key.value"
          :class="`form__field form__field--${key.type} form-control`"
      ></textarea>
      <select v-else-if="key.choices" class="form__field form__field--select form-select" v-model="key.value">
        <option
            v-for="choice in key.choices"
            :value="choice.value"
            :key="choice.value"
        >
          {{ choice.text }}
        </option>
      </select>
    </div>
    <div class="form__button-container form__button-container--row d-flex flex-column flex-sm-row gap-3 justify-content-end">
      <slot name="extra-buttons"></slot>
      <button type="submit" class="form__button form__button--add btn btn-primary">{{ btnText }}</button>
    </div>
  </form>
</template>

<script setup lang="ts">
  import type { ObjectType } from "@/model/Form";

  const emits = defineEmits(['form-submit']);

  const props = defineProps<{
    content: ObjectType,
    btnText?: string,
  }>()

  function send() {
    emits("form-submit", props.content);
  }

  defineExpose({ send });
</script>

<style scoped>

</style>