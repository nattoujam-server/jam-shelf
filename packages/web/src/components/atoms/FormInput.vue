<script setup lang="ts">
const model = defineModel<string | number>()
const props = withDefaults(
  defineProps<{
    type?: string
    placeholder?: string
    inputStyle?: string
    disabled?: boolean
  }>(),
  {
    type: 'text',
    placeholder: '',
    inputStyle: '',
    disabled: false,
  },
)
</script>

<template>
  <div class="control">
    <input
      class="input"
      :class="props.inputStyle"
      v-model="model"
      :type="props.type"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
    />
  </div>
</template>
