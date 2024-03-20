<script setup lang="ts">
import { ref } from 'vue'

import albumStore from '@/stores/album.js'
import svgObjectsStore from '@/stores/svgObjects'

const isDialogOpen = ref(false)

const { images } = albumStore()
const { update } = svgObjectsStore()

function selectImage(img: string) {
  update({ imageName: img })
}

function closeDialog() {
  isDialogOpen.value = false
}

</script>
<template>
  <v-dialog
    v-model="isDialogOpen"
    width="auto"
    transition="scale-transition"
  >
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" prepend-icon="mdi-folder-multiple-image" stacked class="text-none">Album</v-btn>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-text>
          <template v-for="img in images" :key="img">
            <button @click="selectImage(img)">{{ img }}</button>
          </template>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closeDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
