import { ref, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'

import { type TextPayload } from '@/types/svgObjects'

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
    const newScale = innerWidth / baseSize.value.width
    const scaleProportion = newScale / scale.value
    list.value.forEach((obj:TextPayload, i:number) => {
      if (obj.type === 'TEXT') {
        update({
          position: {
            x: obj.position.x * scaleProportion,
            y: obj.position.y * scaleProportion,
          },
          i
        })
      }
    })
    scale.value = newScale
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
