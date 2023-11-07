<script setup lang="ts">
import { ref, computed } from 'vue'

import artboardStore from '@/stores/artboard'

const props = defineProps({
  selectedFontSize: Number,
})

const { scale } = artboardStore()

const sizes = ref([
  { label: 'small', value: 16 },
  { label: 'medium', value: 24 },
  { label: 'large', value: 64 }
])

const selectedSize = computed(() =>
  props.selectedFontSize
    ? sizes.value.find((s) => s.value === props.selectedFontSize)
    : null
)

</script>
<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" min-width="auto" prepend-icon="mdi-format-size" class="text-none">{{
        selectedSize?.label
      }}</v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="(size, index) in sizes"
        :key="index"
        :value="size.value"
        :append-icon="size.value === selectedFontSize ? 'mdi-check' : ''"
        @click="() => $emit('onChange', size.value)"
      >
        <v-list-item-title
          :style="{ fontSize: size.value * scale + 'px', lineHeight: 'normal' }"
          class="font-size-selector__list-item-title"
          >{{ size.label }}</v-list-item-title
        >
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<style>
.font-size-selector__list-item-title {
  width: 140px;
}
</style>
