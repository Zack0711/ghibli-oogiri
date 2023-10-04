<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { ref } from 'vue';
  import { useAlbumStore } from '@/stores/album.js';
  import { useTextStore } from '@/stores/text.js';

  import Text from "./Text.vue";

  const rootRef= ref(null);
  const position = ref({x: 0, y: 0, dx:0, dy: 0});
  const isMouseDown = ref(false);
  const selectedText = ref(-1)

  const albumStore = useAlbumStore();
  const textStore = useTextStore();

  const { imageUrl } = storeToRefs(albumStore);
  const { list } = storeToRefs(textStore);
  const { moveText, updateSelectedTextIndex } = textStore

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
      moveText(position.value.dx, position.value.dy)
    }
  }
</script>
<template> 
  <main>
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
          <image :href="imageUrl" :width="WIDTH" :height="HEIGHT" @click="() => updateSelectedTextIndex(-1)" />
          <Text
            v-for="(t, index) in list"
            :key="'t' + index" 
            :index="index" 
            :payload="t"
            @mousedown="() => updateSelectedTextIndex(index)"
          />
        </g>
      </svg>
    </div>
  </main>
</template>
<style scoped>
  img {
    width: 100%;
  }
  .svg-wrapper {
    display: flex;
  }
</style>