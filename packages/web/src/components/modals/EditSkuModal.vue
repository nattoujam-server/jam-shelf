<script setup lang="ts">
import type { Sku } from '@api/src/models/sku'

import FormField from '@/components/atoms/FormField.vue'
import FormInput from '@/components/atoms/FormInput.vue'
import FormButton from '@/components/atoms/FormButton.vue'

const model = defineModel<Sku>()
const emits = defineEmits<{
  submit: []
  close: []
}>()
</script>

<template>
  <div v-if="model" class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <p class="section has-text-centered is-size-4">在庫の編集</p>
      <FormField label-text="name">
        <FormInput v-model="model.name" />
      </FormField>
      <FormField label-text="stock">
        <FormInput v-model="model.stock" type="number" />
      </FormField>
      <FormField label-text="unit">
        <FormInput v-model="model.unit" />
      </FormField>
      <FormField label-text="warnThreshold">
        <FormInput v-model="model.warnThreshold" type="number" />
      </FormField>
      <FormField label-text="dangerThreshold">
        <FormInput v-model="model.dangerThreshold" type="number" />
      </FormField>
      <div class="field is-grouped is-grouped-centered">
        <FormButton button-style="is-info" @click="() => emits('submit')">保存</FormButton>
        <FormButton @click="() => emits('close')">キャンセル</FormButton>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="() => emits('close')"></button>
  </div>
</template>
