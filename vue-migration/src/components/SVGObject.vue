<script setup lang="ts">
  import { type SVGObjectPayload } from '@/types/svgObjects';
  import Text from "./Text.vue";
  const props = defineProps<{
    payload: SVGObjectPayload,
    index: Number,
  }>()
</script>
<template>
  <Text v-if="payload.type==='TEXT'" :payload="payload" :index="index" />
</template>
