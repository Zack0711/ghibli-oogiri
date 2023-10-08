<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import svgObjectsStore from '@/stores/svgObjects'

const { selectedSVGObjectIndex, getSVGObjectByIndex, update } = svgObjectsStore()

const text = ref('')

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
  <textarea :value="text" @input="(e) => (text = e.target.value)" />
  <button @click="submitText">Update</button>
</template>
