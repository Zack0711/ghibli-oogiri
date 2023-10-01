import { defineStore } from "pinia";

export const useAlbumStore = defineStore('album', {
  state: () => ({
    isOpen: false,
    selectedImage: 'baron001',
    images: ['baron001', 'baron002', 'baron003', 'baron004']
  }),
  getters: {
    imageUrl: state => new URL(`../assets/${state.selectedImage}.jpg`, import.meta.url).href
  },
  actions: {
    selectImage(img:string) {
      this.selectedImage = img;
    },
    closeAlbum() {
      this.isOpen = false;
    },
    openAlbum() {
      this.isOpen = true;
    },
  },
})