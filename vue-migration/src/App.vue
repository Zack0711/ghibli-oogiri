<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

import Artboard from '@/components/Artboard.vue'
import Album from '@/components/Album.vue'
import CreateTextModal from './components/CreateTextModal.vue'
import Editor from '@/components/Editor.vue'

import artboardStore from '@/stores/artboard'
import svgObjectsStore from '@/stores/svgObjects'

const { baseSize, updateScale } = artboardStore()
const { create } = svgObjectsStore()

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
  <main>
    <Artboard />
    <Album />
    <CreateTextModal />
  </main>
  <aside>
    <Editor />
  </aside>
</template>
<style scoped>
main {
  flex: 1 0 0;
}

aside {
  width: 240px;
  background-color: bisque;
  padding: 8px;
}
</style>
