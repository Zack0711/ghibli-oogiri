<script setup lang="ts">
  import { computed, ref, onUpdated, onMounted } from 'vue'
  const textGroupRef = ref(null);

  const props = defineProps({
    text: String,
    isSelected: Boolean,
    x: Number,
    y: Number,
    index: Number,
  })
  
  const textLines = computed(() => props.text ? props.text.split(/[\n\r|\n|\r\n]/) : [])
  const textGroupBBox = computed(() => textGroupRef.value ? textGroupRef.value.getBBox() : { width: 0, height: 0 })

  onUpdated(() => {
    if (textGroupRef.value) {
    //  console.log('onUpdated', textGroupRef.value.getBBox())
    }
  })
</script>
<template>
  <g :transform="'translate(' + x + ',' +  y + ')'">
    <g>
      <rect :width="textGroupBBox.width" :height="textGroupBBox.height" fill="yellow" />
      <g ref="textGroupRef" font-size="12px">
        <text
          v-for="(t, i) in textLines"
          :key="'t' + index + '-' + i" 
          :y="i*12*1.2"
          dominantBaseline="text-before-edge"
          x="0"
        >
          {{ t }}
        </text>
      </g>
    </g>
  </g>
</template>