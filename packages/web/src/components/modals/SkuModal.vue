<script setup lang="ts">
import type { Sku } from '@api/src/models/sku'

import FormField from '@/components/atoms/FormField.vue'
import FormInput from '@/components/atoms/FormInput.vue'
import CardModal from '@/components/atoms/CardModal.vue'

const model = defineModel<Sku>({ required: true })
const props = defineProps<{
  title: string
}>()
const emits = defineEmits<{
  submit: []
  close: []
}>()
</script>

<template>
  <CardModal :title="props.title" @close="() => emits('close')">
    <template v-slot:section>
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
    </template>
    <template v-slot:footer>
      <div class="buttons is-centered">
        <button class="button is-info" @click="() => emits('submit')">保存</button>
        <button class="button" @click="() => emits('close')">キャンセル</button>
      </div>
    </template>
  </CardModal>
</template>
