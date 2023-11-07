<script setup lang="ts">
import { ref } from 'vue'
import svgObjectsStore from '@/stores/svgObjects'
import artboardStore from '@/stores/artboard'

const text = ref('')
const isDialogOpen = ref(false)

const { create } = svgObjectsStore()
const { artboardSize } = artboardStore()

function submitText() {
  create({
    type: 'TEXT',
    position: { x: artboardSize.value.width / 2, y: artboardSize.value.height / 2 },
    content: text.value,
    fontSize: 24,
    moveable: true,
    fontColor: '#000',
    backgroundColor: '#00000000',
    textAnchor: 'start',
    rotate: 0
  })
  closeDialog()
}

function closeDialog() {
  text.value = ''
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
      <v-btn v-bind="props" prepend-icon="mdi-format-annotation-plus" stacked class="text-none">
        Add
      </v-btn>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-text>
          <v-textarea
            label="Input text"
            rows="4"
            :model-value="text"
            @update:modelValue="(value: string) => (text = value)"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn @click="submitText" :disabled="text.length === 0" color="primary">Create</v-btn>
          <v-btn @click="closeDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
