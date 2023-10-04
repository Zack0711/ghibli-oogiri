<script setup lang="ts">
  import { ref, watch, computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useSVGObjectsStore } from '@/stores/svgObjects'

  const svgObjectsStore = useSVGObjectsStore()

  const { selectedSVGObjectIndex } = storeToRefs(svgObjectsStore);
  const { getSVGObjectByIndex, selectedSVGObjectType, create, update } = svgObjectsStore

  const text = ref('');
  const submitButtonLabel = computed(() => selectedSVGObjectType === 'TEXT' ? 'Update' : 'Add' )

  function submitText(){
    if (selectedSVGObjectType === 'TEXT') {
      update({ content: text.value })
    } else {
      create({
        type: 'TEXT',
        position: { x: 120, y: 60 },
        content: text.value,
        fontSize: 12,
        moveable: true,
        backgroundColor: 'transparent',
      })
      text.value = ''
    }
  }

  watch(selectedSVGObjectIndex, () => {
    const svgObject = getSVGObjectByIndex(selectedSVGObjectIndex.value);
    if (svgObject && svgObject.type === 'TEXT') {
      text.value = svgObject.content
    } else {
      text.value = ''
    }
  })
</script>
<template>
  <textarea
    :value="text"
    @input="e => text = e.target.value"
  />
  <button @click="submitText">{{ submitButtonLabel }}</button>
</template>