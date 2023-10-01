<script setup lang="ts">
  import { storeToRefs } from "pinia";
  import { ref } from 'vue';
  import { useAlbumStore } from "@/stores/album.js";
  import Text from "./Text.vue";

  const rootRef= ref(null);
  const position = ref({x: 0, y: 0, dx:0, dy: 0});
  const isMouseDown = ref(false);
  // const textList = ref([{ x: 0, y: 0, text: '123\n456' }, { x: 50, y: 20, text: '12345' }])
  const textList = ref([])
  const selectdText = ref(-1)

  const albumStore = useAlbumStore();
  const { imageUrl } = storeToRefs(albumStore);
  const { openAlbum } = albumStore;

  const WIDTH = 1920 / 4;
  const HEIGHT = 1038 / 4;

  function setTextPosition() {
    if (selectdText.value > -1) {
      textList.value[selectdText.value].x += position.value.dx;
      textList.value[selectdText.value].y += position.value.dy;
    }
  }

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
        setTextPosition();
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
    selectdText.value = -1
  }

  function move(e) {
    const {
      clientX,
      clientY
    } = ( e.clientX ? e : e.touches[0] )
    if (isMouseDown.value) {
      setRelativePosition(clientX, clientY)
    }
  }

  function selectText(index:number) {
    selectdText.value = index;
  }
</script>
<template> 
  <main>
    <div @mousemove="move" @touchmove="move" class="svg-wrapper">
      <svg :width="WIDTH" :height="HEIGHT" xmlns="http://www.w3.org/2000/svg">
        <g 
          ref="rootRef"
          @touchstart="handleMouseTouchDown"
          @mousedown="handleMouseTouchDown" 
          @touchend="handleMouseTouchUp"
          @mouseup="handleMouseTouchUp"
          transform="translate(0 0)"
        >
          <image :href="imageUrl" :width="WIDTH" :height="HEIGHT" />
          <g transform="translate(100, 20)">
            <rect width="90" height="20" fill="blue" x="0" y="0" />
            <text dominantBaseline="text-before-edge" x="0" y="0">1234</text>
          </g>
          <Text
            v-for="(t, index) in textList"
            :key="'t' + index" :index="index" :x="t.x" :y="t.y" :text="t.text"
            @mousedown="selectText(index)"
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
  main {
    display: flex;
    justify-content: center;
  }
  .svg-wrapper {
    display: flex;
  }
</style>