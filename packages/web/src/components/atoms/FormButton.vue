<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    buttonStyle?: string
    disabled?: boolean
  }>(),
  {
    buttonStyle: '',
    disabled: false,
  },
)
const emits = defineEmits<{
  click: [e: MouseEvent]
}>()
</script>

<template>
  <div class="control">
    <button
      class="button"
      :class="props.buttonStyle"
      :disabled="disabled"
      @click="(e) => emits('click', e)"
    >
      <slot />
    </button>
  </div>
</template>
