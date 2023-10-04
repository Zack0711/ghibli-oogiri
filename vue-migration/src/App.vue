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
  <main>
    <Artboard />
    <Album />
  </main>
  <aside>
    <TextEditor />
  </aside>
</template>
<style scoped>
  main {
    flex: 1 0 0;
  }

  aside {
    width: 240px;
    background-color: bisque;
  }
</style>