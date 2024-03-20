import { ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'

let store

export const useEditorStore = defineStore('editor', () => {
  const isAlbumOpen = ref(false)
  const isCreateTextModalOpen = ref(false)

  function openAlbum() {
    isAlbumOpen.value = true
  }

  function closeAlbum() {
    isAlbumOpen.value = false
  }

  function openCreateTextModal() {
    isCreateTextModalOpen.value = true
  }

  function closeCreateTextModal() {
    isCreateTextModalOpen.value = false
  }

  return {
    isAlbumOpen,
    isCreateTextModalOpen,
    openAlbum,
    closeAlbum,
    openCreateTextModal,
    closeCreateTextModal
  }
})

export default () => {
  if (!store) {
    store = useEditorStore()
  }
  const { isAlbumOpen, isCreateTextModalOpen } = storeToRefs(store)
  const { openAlbum, closeAlbum, openCreateTextModal, closeCreateTextModal } = store
  return {
    isAlbumOpen,
    isCreateTextModalOpen,
    openAlbum,
    closeAlbum,
    openCreateTextModal,
    closeCreateTextModal
  }
}
