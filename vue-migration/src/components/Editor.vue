<script setup lang="ts">
import TextEditor from './TextEditor.vue'
import ImageEditor from './ImageEditor.vue'
import svgObjectsStore from '@/stores/svgObjects'
const { selectedSVGObjectType } = svgObjectsStore()
</script>
<template>
  <TextEditor />
  <ImageEditor v-if="selectedSVGObjectType === 'IMAGE'" />
</template>
