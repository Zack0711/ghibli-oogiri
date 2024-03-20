<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps({
  rotate: Number,
})

const rotateLabel = computed(() => `${props.rotate ? props.rotate.toFixed(0) : 0}°`)

</script>
<template>
  <v-menu :close-on-content-click="false" >
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" min-width="auto" style="width: 90px;" class="justify-start" prepend-icon="mdi-restore">{{
        rotateLabel
      }}</v-btn>
    </template>
    <v-card>
      <v-card-text>
        <v-slider
          :model-value="rotate"
          hide-details
          max="180"
          min="-180"
          class="text-rotate-slider"
          @update:model-value="(value:number) => $emit('onChange', value)"
        ></v-slider>
      </v-card-text>
    </v-card>
  </v-menu>
</template>
<style>
.text-rotate-slider {
  width: 240px;
}
</style>
