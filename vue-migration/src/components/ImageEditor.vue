<script setup lang="ts">
import { useAlbumStore } from '@/stores/album.js'
const albumeStore = useAlbumStore()
</script>
<template>
  <button @click="albumeStore.openAlbum">Open Album</button>
</template>
