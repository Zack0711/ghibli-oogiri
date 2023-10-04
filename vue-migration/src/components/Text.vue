<script setup lang="ts">
  import { computed, ref, watch, nextTick } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useSVGObjectsStore } from '@/stores/svgObjects'

  import { type TextPayload } from '@/types/svgObjects';

  const svgObjectsStore = useSVGObjectsStore();
  const { selectedSVGObjectIndex } = storeToRefs(svgObjectsStore);

  const textGroupRef = ref(null);
  const textGroupBBox = ref({ width: 0, height: 0 })
  const fontSize = ref(12);

  const props = defineProps<{
    payload: TextPayload,
    index: Number,
  }>()
  
  const textLines = computed(() => props.payload ? props.payload.content.split(/[\n\r|\n|\r\n]/) : [])
  const isSelected = computed(() => selectedSVGObjectIndex.value === props.index )

  watch(() => [props.payload.content, textGroupRef.value], async() => {
    if (textGroupRef.value) {
      await nextTick()
      textGroupBBox.value = textGroupRef.value.getBBox()
    }
  }, { immediate:true })
</script>
<template>
  <g :transform="'translate(' + payload.position.x + ',' +  payload.position.y + ')'">
    <g>
      <rect :width="textGroupBBox.width" :height="textGroupBBox.height" :fill="isSelected ? 'yellow' : 'transparent'" />
      <g ref="textGroupRef" :font-size="fontSize">
        <text
          v-for="(t, i) in textLines"
          :key="'t' + index + '-' + i" 
          :y="i*fontSize*1.2"
          dominant-baseline="text-before-edge"
          x="0"
        >
          {{ t }}
        </text>
      </g>
      <rect :width="textGroupBBox.width" :height="textGroupBBox.height" fill="transparent" />
    </g>
  </g>
</template>