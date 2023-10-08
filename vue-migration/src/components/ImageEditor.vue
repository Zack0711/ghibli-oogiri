<script setup lang="ts">
import editorStore from '@/stores/editor'
const { openAlbum } = editorStore()
</script>
<template>
  <button @click="openAlbum">Open Album</button>
</template>
