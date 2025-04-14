<script setup lang="ts">
const props = defineProps<{
  labelText: string
}>()
</script>

<template>
  <div class="field">
    <label class="label">{{ props.labelText }}</label>
    <slot />
  </div>
</template>
