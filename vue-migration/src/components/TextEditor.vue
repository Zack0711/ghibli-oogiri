<script setup lang="ts">
  import { ref, onUpdated, watch, computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useTextStore } from '@/stores/text.js';

  const textStore = useTextStore();
  const { selectedTextIndex } = storeToRefs(textStore);
  const { getTextByIndex, create, update } = textStore;

  const WIDTH = 1920 / 4;
  const HEIGHT = 1038 / 4;

  const text = ref('');
  const submitButtonLabel = computed(() => selectedTextIndex.value > -1 ? 'Update' : 'Add' )

  function submitText(){
    if (selectedTextIndex.value > -1) {
      update({ content: text.value })
    } else {
      create({
        position: { x: 120, y: 60 },
        content: text.value
      })
      text.value = ''
    }
  }

  watch(selectedTextIndex, () => {
    const selectedText = getTextByIndex(selectedTextIndex.value);
    if (selectedText) {
      text.value = selectedText.content
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