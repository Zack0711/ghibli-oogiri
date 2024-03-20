<script setup lang="ts">
import svgObjectsStore from '@/stores/svgObjects'

import TextEditor from './TextEditor.vue'

const { selectedSVGObjectType } = svgObjectsStore()
</script>
<template>
  <TextEditor v-if="selectedSVGObjectType === 'TEXT'" />
</template>
