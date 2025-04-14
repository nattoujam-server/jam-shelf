<script setup lang="ts">
import { ref } from 'vue'

import type { Sku } from '@api/src/models/sku'
import jamShelfApi from '@/utils/jamShelfApi'

import StockCard from '@/components/StockCard.vue'
import EditSkuModal from '@/components/modals/EditSkuModal.vue'

const skuList = ref<Array<Sku>>([])
const editingSku = ref<Sku | undefined>(undefined)
const isEditModalOpen = ref<boolean>(false)

const updateStock = async (index: number, add: number) => {
  const sku = skuList.value[index]

  const res = await jamShelfApi.put(`/sku/${sku.id}`, {
    ...sku,
    stock: sku.stock + add,
  })

  skuList.value[index] = res.data
}

const openEditSkuModal = (targetSku: Sku) => {
  editingSku.value = { ...targetSku }
  isEditModalOpen.value = true
}

const closeEditSkuModal = () => {
  isEditModalOpen.value = false
}

const editSku = async () => {
  closeEditSkuModal()

  if (!editingSku.value) return

  await jamShelfApi.put(`/sku/${editingSku.value.id}`, {
    ...editingSku.value,
  })

  editingSku.value = undefined

  await fetchSkuList()
}

const fetchSkuList = async () => {
  await jamShelfApi.get('/sku').then((res) => (skuList.value = res.data))
}

fetchSkuList()
</script>

<template>
  <div>
    <p class="section has-text-centered is-size-3">在庫一覧</p>
    <div class="grid is-col-min-10">
      <div class="cell" v-for="(sku, index) in skuList" :key="`sku-${index}-cell`">
        <StockCard
          :sku="sku"
          @click-plus="() => updateStock(index, 1)"
          @click-edit="() => openEditSkuModal(sku)"
          @click-minus="() => updateStock(index, -1)"
        />
      </div>
    </div>
    <Teleport to="body">
      <EditSkuModal
        v-if="isEditModalOpen"
        v-model="editingSku"
        @submit="editSku"
        @close="closeEditSkuModal"
      />
    </Teleport>
  </div>
</template>
