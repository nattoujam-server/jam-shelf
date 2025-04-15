<script setup lang="ts">
import { ref } from 'vue'

import type { Sku } from '@api/src/models/sku'
import jamShelfApi from '@/utils/jamShelfApi'

import StockCard from '@/components/StockCard.vue'
import SkuModal from '@/components/modals/SkuModal.vue'
import OkCancelModal from '@/components/modals/OkCancelModal.vue'
import CreateIcon from '@/components/atoms/CreateIcon.vue'

const INITIAL_SKU_PARAMS: Sku = {
  id: 0,
  name: '',
  stock: 0,
  unit: '',
  warnThreshold: 2,
  dangerThreshold: 1,
}

const skuList = ref<Array<Sku>>([])
const skuInput = ref<Sku>({ ...INITIAL_SKU_PARAMS })
const deleteSkuId = ref<number>(0)
const isCreateModalOpen = ref<boolean>(false)
const isEditModalOpen = ref<boolean>(false)
const isDeleteModalOpen = ref<boolean>(false)

const updateStock = async (index: number, add: number) => {
  const sku = skuList.value[index]

  const res = await jamShelfApi.put(`/sku/${sku.id}`, {
    ...sku,
    stock: sku.stock + add,
  })

  skuList.value[index] = res.data
}

const openCreateSkuModal = () => (isCreateModalOpen.value = true)
const closeCreateSkuModal = () => {
  skuInput.value = { ...INITIAL_SKU_PARAMS }
  console.log(INITIAL_SKU_PARAMS)
  console.log(skuInput.value)
  isCreateModalOpen.value = false
}

const openEditSkuModal = (targetSku: Sku) => {
  skuInput.value = { ...targetSku }
  isEditModalOpen.value = true
}
const closeEditSkuModal = () => {
  skuInput.value = { ...INITIAL_SKU_PARAMS }
  isEditModalOpen.value = false
}

const createSku = async () => {
  if (!skuInput.value) return

  await jamShelfApi.post('/sku', {
    ...skuInput.value,
  })

  closeCreateSkuModal()

  await fetchSkuList()
}

const editSku = async () => {
  if (!skuInput.value) return

  await jamShelfApi.put(`/sku/${skuInput.value.id}`, {
    ...skuInput.value,
  })

  closeEditSkuModal()

  await fetchSkuList()
}

const openDeleteModal = (skuId: number) => {
  deleteSkuId.value = skuId
  isDeleteModalOpen.value = true
}

const closeDeleteModal = () => {
  deleteSkuId.value = 0
  isDeleteModalOpen.value = false
}

const deleteSku = async () => {
  await jamShelfApi.delete(`/sku/${deleteSkuId.value}`)

  closeDeleteModal()
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
          @click-delete="() => openDeleteModal(sku.id)"
        />
      </div>
    </div>
    <CreateIcon class="fixed-right-bottom" @click="openCreateSkuModal" />
    <Teleport to="body">
      <SkuModal
        v-if="isCreateModalOpen"
        title="在庫の新規作成"
        v-model="skuInput"
        @submit="createSku"
        @close="closeCreateSkuModal"
      />
    </Teleport>
    <Teleport to="body">
      <SkuModal
        v-if="isEditModalOpen"
        v-model="skuInput"
        title="在庫の編集"
        @submit="editSku"
        @close="closeEditSkuModal"
      />
    </Teleport>
    <Teleport to="body">
      <OkCancelModal v-if="isDeleteModalOpen" @ok="deleteSku" @cancel="closeDeleteModal">
        本当に削除しますか？
      </OkCancelModal>
    </Teleport>
  </div>
</template>

<style scoped>
.fixed-right-bottom {
  position: fixed;
  right: 20px;
  bottom: 20px;
}
</style>
