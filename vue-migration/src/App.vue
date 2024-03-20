<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

import Artboard from '@/components/Artboard.vue'
import Editor from '@/components/Editor.vue'
import CreateTextModal from '@/components/CreateTextModal.vue'
import AlbumModal from '@/components/AlbumModal.vue'
import TextEditor from './components/TextEditor.vue'

import artboardStore from '@/stores/artboard'
import svgObjectsStore from '@/stores/svgObjects'

const { baseSize, updateScale } = artboardStore()
const { create, selectedSVGObjectType } = svgObjectsStore()

function handleResize() {
  updateScale(window.innerWidth)
}

onMounted(() => {
  updateScale(window.innerWidth)
  create({
    type: 'IMAGE',
    imageName: 'baron001',
    moveable: false,
    position: { x: 0, y: 0 },
    backgroundColor: 'transparent',
    width: baseSize.value.width,
    height: baseSize.value.height
  })
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <main style="height: 100vh;" class="d-flex justify-center align-center" >
    <v-sheet>
      <v-toolbar title="Oogiri">
        <AlbumModal />
        <CreateTextModal />
      </v-toolbar>
      <Artboard />
      <TextEditor v-if="selectedSVGObjectType === 'TEXT'" class="text-editor" />
    </v-sheet>
  </main>
</template>
<style scoped>
main {
  flex: 1 0 0;
}

.text-editor {
  position: absolute;
  bottom: 8px;
  right: 8px;
}
</style>
