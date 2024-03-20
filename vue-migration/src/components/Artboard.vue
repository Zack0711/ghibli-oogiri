<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useSVGObjectsStore } from '@/stores/svgObjects'
import { useArtboardStore } from '@/stores/artboard'
import SVGObject from './SVGObject.vue'

const rootRef = ref(null)
const position = ref({ x: 0, y: 0, dx: 0, dy: 0 })
const isMouseDown = ref(false)

const svgObjectsStore = useSVGObjectsStore()
const artboardStore = useArtboardStore()

const { list } = storeToRefs(svgObjectsStore)
const { artboardSize } = storeToRefs(artboardStore)
const { moveSVGObject, setSelectedSVGObjectIndex } = svgObjectsStore

function setRelativePosition(clientX: number, clientY: number, isInitial = false) {
  if (rootRef.value) {
    const { top, left, bottom, right, x, y } = rootRef.value.getBoundingClientRect()
    if (clientX >= left && clientX <= right && clientY >= top && clientY <= bottom) {
      position.value = {
        x: clientX - x,
        y: clientY - y,
        dx: isInitial ? 0 : clientX - x - position.value.x,
        dy: isInitial ? 0 : clientY - y - position.value.y
      }
    }
  }
}

function handleMouseTouchDown(e) {
  const { clientX, clientY } = e.clientX ? e : e.touches[0]
  isMouseDown.value = true
  setRelativePosition(clientX, clientY, true)
}

function handleMouseTouchUp() {
  isMouseDown.value = false
}

function move(e) {
  const { clientX, clientY } = e.clientX ? e : e.touches[0]
  if (isMouseDown.value) {
    setRelativePosition(clientX, clientY)
    moveSVGObject(position.value.dx, position.value.dy)
  }
}
</script>
<template>
  <div @mousemove="move" @touchmove="move" class="d-flex">
    <svg
      :width="artboardSize.width"
      :height="artboardSize.height"
      :viewBox="'0 0 ' + artboardSize.width + ' ' + artboardSize.height"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="shadow-filter" x="0" y="0" width="150%" height="150%" opacity="0.5">
          <feOffset result="offOut" in="SourceAlpha" dx="0" dy="0" />
          <feGaussianBlur result="blurOut" in="offOut" stdDeviation="2" />
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
      </defs>
      <g
        ref="rootRef"
        @touchstart="handleMouseTouchDown"
        @mousedown="handleMouseTouchDown"
        @touchend="handleMouseTouchUp"
        @mouseup="handleMouseTouchUp"
        transform="translate(0 0)"
      >
        <SVGObject
          v-for="(objectPayload, index) in list"
          :key="'svgObj-' + index"
          :index="index"
          :payload="objectPayload"
          @mousedown="() => setSelectedSVGObjectIndex(index)"
        />
      </g>
    </svg>
  </div>
</template>