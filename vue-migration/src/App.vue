<script setup lang="ts">
  import { storeToRefs } from "pinia";
  import { useAlbumStore } from "@/stores/album.js";
  import Artboard from './components/Artboard.vue';
  import TextEditor from "./components/TextEditor.vue";
  import Album from './components/Album.vue';

  const albumStore = useAlbumStore();
  const { isOpen } = storeToRefs(albumStore);

</script>

<template>
  <Artboard />
  <TextEditor />
  <Album />
</template>