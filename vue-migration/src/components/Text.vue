<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import svgObjectsStore from '@/stores/svgObjects'
import artboardStore from '@/stores/artboard'

import { type TextPayload } from '@/types/svgObjects'

const { selectedSVGObjectIndex } = svgObjectsStore()
const { scale } = artboardStore()

const textGroupRef = ref(null)
const textGroupBBox = ref({ width: 0, height: 0 })

const props = defineProps<{
  payload: TextPayload
  index: Number
}>()

const textLines = computed(() =>
  props.payload ? props.payload.content.split(/[\n\r|\n|\r\n]/) : []
)
const isSelected = computed(() => selectedSVGObjectIndex.value === props.index)

watch(
  () => [props.payload.content, textGroupRef.value],
  async () => {
    if (textGroupRef.value) {
      await nextTick()
      textGroupBBox.value = textGroupRef.value.getBBox()
    }
  },
  { immediate: true }
)
</script>
<template>
  <g :transform="'translate(' + -textGroupBBox.width / 2 + ',' + -textGroupBBox.height / 2 + ')'">
    <rect
      :width="textGroupBBox.width"
      :height="textGroupBBox.height"
      :fill="isSelected ? 'yellow' : 'transparent'"
    />
    <g ref="textGroupRef" :font-size="payload.fontSize * scale">
      <text
        v-for="(t, i) in textLines"
        :key="'t' + index + '-' + i"
        :y="i * payload.fontSize * scale * 1.2"
        dominant-baseline="text-before-edge"
        x="0"
      >
        {{ t }}
      </text>
    </g>
    <rect :width="textGroupBBox.width" :height="textGroupBBox.height" fill="transparent" />
  </g>
</template>
