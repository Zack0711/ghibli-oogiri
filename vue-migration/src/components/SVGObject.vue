<script setup lang="ts">
import { type SVGObjectPayload } from '@/types/svgObjects'
import Text from './Text.vue'
import Image from './Image.vue'
const props = defineProps<{
  payload: SVGObjectPayload
  index: Number
}>()
</script>
<template>
  <g
    :transform="
      'translate(' +
      payload.position.x +
      ',' +
      payload.position.y +
      ') rotate(' +
      (payload.rotate || 0) +
      ')'
    "
  >
    <Text v-if="payload.type === 'TEXT'" :payload="payload" :index="index" />
    <Image v-if="payload.type === 'IMAGE'" :payload="payload" :index="index" />
  </g>
</template>
