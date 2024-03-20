<script setup lang="ts">
const props = defineProps({
  icon: String,
  color: String
})
</script>
<template>
  <v-menu :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" width="48" min-width="auto">
        <div class="d-flex align-center flex-column justify-center">
          <v-icon :icon="icon"></v-icon>
          <v-sheet tile height="4" width="26" :color="color"></v-sheet>
        </div>
      </v-btn>
    </template>
    <v-color-picker
      :modes="['hexa']"
      :model-value="color"
      @update:modelValue="(value:string) => $emit('onChange', value)"
    ></v-color-picker>
  </v-menu>
</template>
