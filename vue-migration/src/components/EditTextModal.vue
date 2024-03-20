<script setup lang="ts">
import { ref, watch } from 'vue'
import svgObjectsStore from '@/stores/svgObjects'

const text = ref('')
const isDialogOpen = ref(false)

const { update, selectedSVGObject } = svgObjectsStore()

function updateText() {
  update({ content: text.value })
  isDialogOpen.value = false
}

watch(
  () => [selectedSVGObject],
  async () => {
    if (selectedSVGObject.value) {
      text.value = selectedSVGObject.value.content
    }
  },
  { immediate: true }
)

</script>
<template>
  <v-dialog
    v-model="isDialogOpen"
    width="auto"
    transition="scale-transition"
  >
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" icon="mdi-text-box-edit-outline"></v-btn>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-text>
          <v-textarea
            label="Edit text"
            rows="4"
            :model-value="text"
            @update:modelValue="(value: string) => (text = value)"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn @click="updateText" :disabled="text.length === 0" color="primary">Update</v-btn>
          <v-btn @click="() => isDialogOpen = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
