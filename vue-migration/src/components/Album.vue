<script setup lang="ts">
  import { storeToRefs } from "pinia";
  import { useAlbumStore } from "@/stores/album.js";
  import Modal from './Modal.vue'

  const albumStore = useAlbumStore();
  const { images, isOpen } = storeToRefs(albumStore);
  const { selectImage, closeAlbum } = albumStore;
</script>
<template>
  <Modal :show="isOpen" @close="closeAlbum">
    <template #header>
      <h3>Choose Image</h3>
    </template>
    <template #body>
      <template
        v-for="img in images"
        :key="img"
      >
        <button @click="selectImage(img)">{{ img }}</button>
      </template>
    </template>
    <template #footer>
      <button @click="closeAlbum">Close</button>
    </template>
  </Modal>
</template>
