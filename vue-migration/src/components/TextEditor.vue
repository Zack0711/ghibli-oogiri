<script setup lang="ts">
import { ref, watch } from 'vue'
import svgObjectsStore from '@/stores/svgObjects'

import ColorPicker from './ColorPicker.vue'
import FontSizeSelector from './FontSizeSelector.vue'
import TextRotateSlider from './TextRotateSlider.vue'
import EditTextModal from './EditTextModal.vue'

const { update, selectedSVGObject } = svgObjectsStore()

const text = ref('')

function rotateText(value: number) {
  update({ rotate: value })
}

function alignText(value: string) {
  update({ textAnchor: value })
}

function changeBackgroundColor(value: string) {
  update({ backgroundColor: value })
}

function changeFontColorChange(value: string) {
  update({ fontColor: value })
}

function changeFontSize(value: number) {
  update({ fontSize: value })
}

watch(
  () => [selectedSVGObject.value],
  async () => {
    if (selectedSVGObject.value) {
      text.value = selectedSVGObject.value.content
    }
  },
  { immediate: true }
)
</script>
<template>
  <v-card>
    <v-card-text>
      <div class="d-flex my-1">
        <v-btn-toggle
          variant="outlined"
          divided
          :model-value="selectedSVGObject?.textAnchor"
          @update:model-value="alignText"
        >
          <v-btn icon="mdi-format-align-left" value="start"></v-btn>
          <v-btn icon="mdi-format-align-center" value="middle"></v-btn>
          <v-btn icon="mdi-format-align-right" value="end"></v-btn>
        </v-btn-toggle>
        <v-btn-group divided class="ml-1" variant="outlined">
          <ColorPicker
            :color="selectedSVGObject?.fontColor"
            icon="mdi-format-color-text"
            @onChange="changeFontColorChange"
          />
          <ColorPicker
            :color="selectedSVGObject?.backgroundColor"
            icon="mdi-format-color-fill"
            @onChange="changeBackgroundColor"
          />
          <EditTextModal />
        </v-btn-group>
      </div>
      <div class="my-1">
        <v-btn-group divided variant="outlined">
          <TextRotateSlider :rotate="selectedSVGObject?.rotate || 0" @onChange="rotateText" />
          <FontSizeSelector :selected-font-size="selectedSVGObject?.fontSize" @onChange="changeFontSize" />
          <v-btn icon="mdi-trash-can-outline"></v-btn>
        </v-btn-group>
      </div>
    </v-card-text>
  </v-card>
</template>
