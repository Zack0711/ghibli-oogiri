<script setup lang="ts">
import albumStore from '@/stores/album.js'
import svgObjectsStore from '@/stores/svgObjects'
import editorStore from '@/stores/editor'

import Modal from './Modal.vue'

const { images } = albumStore()

const { isAlbumOpen, closeAlbum } = editorStore()
const { update } = svgObjectsStore()

function selectImage(img: string) {
  update({ imageName: img })
}
</script>
<template>
  <Modal :show="isAlbumOpen" @close="closeAlbum">
    <template #header>
      <h3>Choose Image</h3>
    </template>
    <template #body>
      <template v-for="img in images" :key="img">
        <button @click="selectImage(img)">{{ img }}</button>
      </template>
    </template>
    <template #footer>
      <v-btn @click="closeAlbum">Close</v-btn>
    </template>
  </Modal>
</template>
