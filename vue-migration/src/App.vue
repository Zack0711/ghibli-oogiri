<script setup lang="ts">
  import { storeToRefs } from "pinia";
  import { useAlbumStore } from "@/stores/album.js";
  import Artboard from './components/Artboard.vue';
  import Album from './components/Album.vue';

  const albumStore = useAlbumStore();
  const { isOpen } = storeToRefs(albumStore);

</script>

<template>
  <Artboard />
  <Album />
</template>