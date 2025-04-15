<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string
  }>(),
  {
    title: '',
  },
)

const emits = defineEmits<{
  close: []
}>()
</script>

<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ props.title }}</p>
      </header>
      <section class="modal-card-body">
        <slot name="section" />
      </section>
      <footer class="modal-card-foot">
        <slot name="footer" />
      </footer>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="() => emits('close')"></button>
  </div>
</template>
