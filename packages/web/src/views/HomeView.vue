<script setup lang="ts">
import { ref } from 'vue'

import type { Sku } from '@api/src/models/sku'
import jamShelfApi from '@/utils/jamShelfApi'

import StockCard from '@/components/StockCard.vue'

const skuList = ref<Array<Sku>>([])

const updateStock = async (index: number, add: number) => {
  const sku = skuList.value[index]

  const res = await jamShelfApi.put(`/sku/${sku.id}`, {
    ...sku,
    stock: sku.stock + add,
  })

  skuList.value[index] = res.data
}

jamShelfApi.get('/sku').then((res) => (skuList.value = res.data))
</script>

<template>
  <div>
    <p class="section has-text-centered is-size-3">在庫一覧</p>
    <div class="grid is-col-min-10">
      <div class="cell" v-for="(sku, index) in skuList" :key="`sku-${index}-cell`">
        <StockCard
          :sku="sku"
          @click-plus="() => updateStock(index, 1)"
          @click-minus="() => updateStock(index, -1)"
        />
      </div>
    </div>
  </div>
</template>
