<script setup lang="ts">
import { computed } from 'vue'

import { type ImagePayload } from '@/types/svgObjects'

import artboardStore from '@/stores/artboard'
const { scale } = artboardStore()

const props = defineProps<{
  payload: ImagePayload
  index: Number
}>()
const imageUrl = computed(() =>
  props.payload ? new URL(`../assets/${props.payload.imageName}.jpg`, import.meta.url).href : ''
)
</script>
<template>
  <image :href="imageUrl" :width="payload.width * scale" :height="payload.height * scale" />
</template>
