import { ref, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'

import svgObjectsStore from './svgObjects'

let store

export const useArtboardStore = defineStore('artboard', () => {
  const { list, update } = svgObjectsStore()

  const baseSize = ref({ width: 960, height: 519 })
  const scale = ref(1)
  const artboardSize = computed(() => ({
    width: baseSize.value.width * scale.value,
    height: baseSize.value.height * scale.value
  }))

  function updateScale(innerWidth: number) {
    scale.value = (innerWidth - 240) / baseSize.value.width
  }

  return {
    baseSize,
    artboardSize,
    scale,
    updateScale
  }
})

export default () => {
  if (!store) {
    store = useArtboardStore()
  }
  const { baseSize, artboardSize, scale } = storeToRefs(store)
  const { updateScale } = store
  return {
    baseSize,
    artboardSize,
    scale,
    updateScale
  }
}
