<script setup lang="ts">
import { ref, onMounted } from 'vue'
import svgObjectsStore from '@/stores/svgObjects'
import artboardStore from '@/stores/artboard'
import editorStore from '@/stores/editor'

import Modal from './Modal.vue'

const text = ref('')

const { create } = svgObjectsStore()
const { artboardSize } = artboardStore()
const { isCreateTextModalOpen, closeCreateTextModal } = editorStore()

function submitText() {
  create({
    type: 'TEXT',
    position: { x: artboardSize.value.width / 2, y: artboardSize.value.height / 2 },
    content: text.value,
    fontSize: 24,
    moveable: true,
    backgroundColor: 'transparent'
  })
  text.value = ''
  closeCreateTextModal()
}

onMounted(() => {
  text.value = ''
})
</script>
<template>
  <Modal :show="isCreateTextModalOpen" @close="closeCreateTextModal">
    <template #header>
      <h3>Add Text</h3>
    </template>
    <template #body>
      <textarea :value="text" @input="(e) => (text = e.target.value)" />
    </template>
    <template #footer>
      <button @click="submitText">Create</button>
      <button @click="closeCreateTextModal">Cancel</button>
    </template>
  </Modal>
</template>
