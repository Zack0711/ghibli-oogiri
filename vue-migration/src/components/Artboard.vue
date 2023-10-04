<script setup lang="ts">
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useSVGObjectsStore } from '@/stores/svgObjects'

  import Image from './Image.vue';
  import SVGObject from './SVGObject.vue';

  const rootRef= ref(null);
  const position = ref({x: 0, y: 0, dx:0, dy: 0});
  const isMouseDown = ref(false);

  const svgObjectsStore = useSVGObjectsStore();

  const { list } = storeToRefs(svgObjectsStore)
  const { moveSVGObject, setSelectedSVGObjectIndex } = svgObjectsStore

  const WIDTH = 1920 / 4;
  const HEIGHT = 1038 / 4;

  function setRelativePosition(clientX:number, clientY:number, isInitial = false) {
    if (rootRef.value) {
      const {
        top, 
        left, 
        bottom, 
        right,
        x,
        y,
      } = rootRef.value.getBoundingClientRect()
      if ((clientX >= left && clientX <= right) && (clientY >= top && clientY <= bottom)) {
        position.value =  {
          x: clientX - x,
          y: clientY - y,
          dx: isInitial ? 0 : clientX - x - position.value.x,
          dy: isInitial ? 0 : clientY - y - position.value.y,
        }
      }
    }
  }

  function handleMouseTouchDown(e){
    const {
      clientX,
      clientY
    } = ( e.clientX ? e : e.touches[0] )
    isMouseDown.value = true
    setRelativePosition(clientX, clientY, true)
  }

  function handleMouseTouchUp(){
    isMouseDown.value = false
  }

  function move(e) {
    const {
      clientX,
      clientY
    } = ( e.clientX ? e : e.touches[0] )
    if (isMouseDown.value) {
      setRelativePosition(clientX, clientY)
      moveSVGObject(position.value.dx, position.value.dy)
    }
  }
</script>
<template> 
  <div @mousemove="move" @touchmove="move" class="svg-wrapper">
    <svg :width="WIDTH" :height="HEIGHT" :viewBox="'0 0 ' + WIDTH + ' ' + HEIGHT" xmlns="http://www.w3.org/2000/svg">
      <g 
        ref="rootRef"
        @touchstart="handleMouseTouchDown"
        @mousedown="handleMouseTouchDown" 
        @touchend="handleMouseTouchUp"
        @mouseup="handleMouseTouchUp"
        transform="translate(0 0)"
      >
        <Image @click="() => setSelectedSVGObjectIndex(-1)" />
        <SVGObject
          v-for="(objectPayload, index) in list"
          :key="'svgObj-' + index" 
          :index="index" 
          :payload="objectPayload"
          @mousedown="() => setSelectedSVGObjectIndex(index)"
        />
      </g>
    </svg>
  </div>
</template>
<style scoped>
  .svg-wrapper {
    display: flex;
  }
</style>