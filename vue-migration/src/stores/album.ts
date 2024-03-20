import { ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'

let store

export const useAlbumStore = defineStore('album', () => {
  const isOpen = ref(false)
  const images = ref(['baron001', 'baron002', 'baron003', 'baron004'])

  function closeAlbum() {
    isOpen.value = false
  }

  function openAlbum() {
    isOpen.value = true
  }

  return {
    isOpen,
    images,
    closeAlbum,
    openAlbum
  }
})

export default () => {
  if (!store) {
    store = useAlbumStore()
  }
  const { isOpen, images } = storeToRefs(store)
  const { closeAlbum, openAlbum } = store
  return {
    isOpen,
    images,
    closeAlbum,
    openAlbum
  }
}
