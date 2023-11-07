<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import svgObjectsStore from '@/stores/svgObjects'

const { selectedSVGObjectIndex, getSVGObjectByIndex, update } = svgObjectsStore()

const text = ref('')
const rotate = ref(0)

function rotateText() {
  //console.log('rotateText', rotate.value)
  update({ rotate: rotate.value })
}

function submitText() {
  update({ content: text.value })
}

watch(
  () => [selectedSVGObjectIndex.value],
  async () => {
    if (selectedSVGObjectIndex.value) {
      const svgObject = getSVGObjectByIndex(selectedSVGObjectIndex.value)
      text.value = svgObject.content
    }
  },
  { immediate: true }
)

onMounted(() => {
  const svgObject = getSVGObjectByIndex(selectedSVGObjectIndex.value)
  text.value = svgObject.content
})
</script>
<template>
  <v-color-picker :modes="['hexa']"></v-color-picker>
  <v-slider
    v-model="rotate"
    prepend-icon="mdi-restore"
    max="360"
    min="0"
    @start="rotateText"
    @update:model-value="rotateText"
  ></v-slider>
  <v-textarea v-model="text" variant="outlined"></v-textarea>
  <v-btn @click="submitText">Update</v-btn>
</template>
