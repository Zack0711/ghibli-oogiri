<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useAlbumStore } from '@/stores/album.js';
  const WIDTH = 1920 / 4;
  const HEIGHT = 1038 / 4;

  const albumStore = useAlbumStore();
  const { imageUrl } = storeToRefs(albumStore);
</script>
<template>
  <g>
    <image :href="imageUrl" :width="WIDTH" :height="HEIGHT" />
  </g>
</template>