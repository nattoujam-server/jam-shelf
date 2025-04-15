<script setup lang="ts">
import CardModal from '@/components/atoms/CardModal.vue'

const props = withDefaults(
  defineProps<{
    title?: string
  }>(),
  {
    title: '',
  },
)

const emits = defineEmits<{
  ok: []
  cancel: []
}>()
</script>

<template>
  <CardModal :title="props.title" @close="() => emits('cancel')">
    <template v-slot:section>
      <slot />
    </template>
    <template v-slot:footer>
      <div class="buttons is-centered">
        <button class="button is-info" @click="() => emits('ok')">OK</button>
        <button class="button" @click="() => emits('cancel')">キャンセル</button>
      </div>
    </template>
  </CardModal>
</template>
