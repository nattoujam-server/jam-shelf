<script setup lang="ts">
import { ref, computed } from 'vue'

import type { Sku } from '@api/src/models/sku'

const loading = ref<boolean>(false)

const props = defineProps<{
  sku: Sku
}>()

const emits = defineEmits<{
  clickPlus: []
  clickMinus: []
}>()

const isWarn = computed(() => props.sku.stock <= props.sku.warnThreshold)
const isDanger = computed(() => props.sku.stock <= props.sku.dangerThreshold)

const statusTextColor = computed(() => {
  if (isDanger.value) return 'has-text-danger'
  else if (isWarn.value) return 'has-text-warning'
  else return ''
})

const minusDisabled = computed<boolean>(() => loading.value || props.sku.stock <= 0)

const clickMinus = () => {
  loading.value = true
  setTimeout(() => (loading.value = false), 100)
  emits('clickMinus')
}

const clickPlus = () => {
  loading.value = true
  setTimeout(() => (loading.value = false), 100)
  emits('clickPlus')
}
</script>

<template>
  <div class="card">
    <div class="card-header">
      <p class="card-header-title">category</p>
      <div class="card-header-icon">
        <button class="delete"></button>
      </div>
    </div>
    <div class="card-content">
      <p class="is-size-4" :class="statusTextColor">{{ props.sku.name }}</p>
      <p class="has-text-right">
        <span class="is-size-1" :class="statusTextColor">{{ props.sku.stock }}</span>
        <span class="is-size-5 ml-2">{{ props.sku.unit }}</span>
      </p>
    </div>
    <footer class="card-footer">
      <button class="card-footer-item" :disabled="minusDisabled" @click="clickMinus">-1</button>
      <button class="card-footer-item" @click="">Edit</button>
      <button class="card-footer-item" :disabled="loading" @click="clickPlus">+1</button>
    </footer>
  </div>
</template>
