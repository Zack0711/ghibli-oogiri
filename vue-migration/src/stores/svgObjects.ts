import { ref, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'

import type { Ref } from 'vue'
import type { SVGObjectPayload, UpdatePayload } from '@/types/svgObjects'

let store

export const useSVGObjectsStore = defineStore('svgObjects', () => {
  const list: Ref<SVGObjectPayload[]> = ref([])
  const selectedSVGObjectIndex = ref(0)
  const selectedSVGObjectType = computed(() => list.value[selectedSVGObjectIndex.value]?.type || '')

  function create(payload: SVGObjectPayload) {
    list.value.push(payload)
  }

  function update(updatePayload: UpdatePayload, targetIndex?: number) {
    const index = targetIndex && targetIndex >= 0 ? targetIndex : selectedSVGObjectIndex.value
    if (index > -1 && list.value[index]) {
      list.value[index] = { ...list.value[index], ...updatePayload }
    }
  }

  function moveSVGObject(dx: number, dy: number) {
    const svgObject = list.value[selectedSVGObjectIndex.value]
    if (svgObject && svgObject.moveable) {
      update({
        position: {
          x: svgObject.position.x + dx,
          y: svgObject.position.y + dy
        }
      })
    }
  }

  function setSelectedSVGObjectIndex(index: number) {
    selectedSVGObjectIndex.value = index
  }

  function getSVGObjectByIndex(index: number) {
    return list.value[index]
  }

  return {
    list,
    selectedSVGObjectIndex,
    selectedSVGObjectType,
    create,
    update,
    moveSVGObject,
    setSelectedSVGObjectIndex,
    getSVGObjectByIndex
  }
})

export default () => {
  if (!store) {
    store = useSVGObjectsStore()
  }
  const { list, selectedSVGObjectIndex, selectedSVGObjectType } = storeToRefs(store)
  const { create, update, moveSVGObject, setSelectedSVGObjectIndex, getSVGObjectByIndex } = store
  return {
    list,
    selectedSVGObjectIndex,
    selectedSVGObjectType,
    create,
    update,
    moveSVGObject,
    setSelectedSVGObjectIndex,
    getSVGObjectByIndex
  }
}
