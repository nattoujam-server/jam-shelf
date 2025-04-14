<script setup lang="ts">
const model = defineModel<string | number>()
const props = defineProps<{
  optionList: Array<{ value: string | number; name: string | number }>
}>()
</script>

<template>
  <div class="control">
    <div class="select">
      <select v-model="model">
        <option
          v-for="(o, index) in props.optionList"
          :key="`option-${index}-${o.name}`"
          :value="o.value"
        >
          {{ o.name }}
        </option>
      </select>
    </div>
  </div>
</template>
