<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import svgObjectsStore from '@/stores/svgObjects'
import artboardStore from '@/stores/artboard'

const { selectedSVGObjectIndex, selectedSVGObjectType, getSVGObjectByIndex, create, update } =
  svgObjectsStore()
const { scale, artboardSize } = artboardStore()

const text = ref('')
const submitButtonLabel = computed(() =>
  selectedSVGObjectType.value === 'TEXT' ? 'Update' : 'Add'
)

function submitText() {
  if (selectedSVGObjectType.value === 'TEXT') {
    update({ content: text.value })
  } else {
    create({
      type: 'TEXT',
      position: { x: artboardSize.value.width / 2, y: artboardSize.value.height / 2 },
      content: text.value,
      fontSize: 24,
      moveable: true,
      backgroundColor: 'transparent'
    })
    text.value = ''
  }
}

watch(selectedSVGObjectIndex, () => {
  const svgObject = getSVGObjectByIndex(selectedSVGObjectIndex.value)
  if (svgObject && svgObject.type === 'TEXT') {
    text.value = svgObject.content
  } else {
    text.value = ''
  }
})
</script>
<template>
  <textarea :value="text" @input="(e) => (text = e.target.value)" />
  <button @click="submitText">{{ submitButtonLabel }}</button>
</template>
