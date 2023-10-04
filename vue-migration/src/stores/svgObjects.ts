import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import type { Ref } from 'vue'
import type { SVGObjectPayload, UpdatePayload } from '@/types/svgObjects'

export const useSVGObjectsStore = defineStore('svgObjects', () => {
  const list:Ref<SVGObjectPayload[]>= ref([])
  const selectedSVGObjectIndex = ref(-1)

  const selectedSVGObjectType = computed(() => list.value[selectedSVGObjectIndex.value]?.type || '' )

  function create(payload:SVGObjectPayload) {
    list.value.push(payload)
  }

  function update(updatePayload:UpdatePayload) {
    if (selectedSVGObjectIndex.value > -1) {
      const index = selectedSVGObjectIndex.value
      list.value[index] = { ...list.value[index], ...updatePayload }
    }
  }

  function moveSVGObject(dx:number, dy:number) {
    const svgObject = list.value[selectedSVGObjectIndex.value]
    if (svgObject && svgObject.moveable ) {
      update({
        position: {
          x: svgObject.position.x + dx,
          y: svgObject.position.y + dy,
        }
      })
    }
  }

  function setSelectedSVGObjectIndex(index:number) {
    selectedSVGObjectIndex.value = index
  }

  function getSVGObjectByIndex(index:number) {
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
    getSVGObjectByIndex,
  }
})
