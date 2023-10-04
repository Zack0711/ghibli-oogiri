import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import type { Ref } from 'vue'
import type { TextPayload, TextUpdatePayload } from '@/types/text'

export const useTextStore = defineStore('text', () => {
  const list:Ref<TextPayload[]>= ref([])
  const selectedTextIndex = ref(-1)

  function getTextByIndex(index:number) {
    return list.value[index]
  }

  function update(updatePayload:TextUpdatePayload) {
    if (selectedTextIndex.value > -1) {
      const index = selectedTextIndex.value
      list.value[index] = { ...list.value[index], ...updatePayload }
    }
  }

  function moveText(dx:number, dy:number) {
    if (selectedTextIndex.value > -1) {
      const index = selectedTextIndex.value
      update({
        position: {
          x: list.value[index].position.x + dx,
          y: list.value[index].position.y + dy,
        }
      })
    }
  }

  function create(payload:TextPayload) {
    list.value.push(payload)
  }

  function updateSelectedTextIndex(index:number) {
    selectedTextIndex.value = index
  }

  return { 
    list,
    selectedTextIndex,
    create,
    update,
    moveText,
    getTextByIndex,
    updateSelectedTextIndex,
  }
})
