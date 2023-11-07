<script setup lang="ts">
import svgObjectsStore from '@/stores/svgObjects'
import editorStore from '@/stores/editor'

import TextEditor from './TextEditor.vue'

const { selectedSVGObjectType } = svgObjectsStore()
const { openCreateTextModal, openAlbum } = editorStore()
</script>
<template>
  <v-btn @click="openAlbum">Open Album</v-btn>
  <v-btn @click="openCreateTextModal">Add Text</v-btn>
  <TextEditor v-if="selectedSVGObjectType === 'TEXT'" />
</template>
