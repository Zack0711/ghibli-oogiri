<script setup lang="ts">
import svgObjectsStore from '@/stores/svgObjects'
import editorStore from '@/stores/editor'

import TextEditor from './TextEditor.vue'

const { selectedSVGObjectType } = svgObjectsStore()
const { openCreateTextModal, openAlbum } = editorStore()
</script>
<template>
  <button @click="openAlbum">Open Album</button>
  <button @click="openCreateTextModal">Add Text</button>
  <TextEditor v-if="selectedSVGObjectType === 'TEXT'" />
</template>
