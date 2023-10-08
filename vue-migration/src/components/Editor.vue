<script setup lang="ts">
import svgObjectsStore from '@/stores/svgObjects'
import editorStore from '@/stores/editor'

import TextEditor from './TextEditor.vue'
import ImageEditor from './ImageEditor.vue'

const { selectedSVGObjectType } = svgObjectsStore()
const { openCreateTextModal } = editorStore()
</script>
<template>
  <TextEditor v-if="selectedSVGObjectType === 'TEXT'" />
  <ImageEditor v-if="selectedSVGObjectType === 'IMAGE'" />
  <button @click="openCreateTextModal">Add Text</button>
</template>
