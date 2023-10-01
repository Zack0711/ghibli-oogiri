<script setup lang="ts">
  import { computed, reactive, ref } from "vue"
  
  const titles = ref([
    'marnie',
    'kaguyahime',
    'kazetachinu',
    'kokurikozaka',
    'karigurashi',
    'ponyo',
    'ged',
    'chihiro',
    'howl',
    'baron',
    'ghiblies',
    'yamada',
    'mononoke',
    'mimi',
  ])

  const data = ref({
    selected: titles.value[0]
  });

  function selectTitle(title:string) {
    data.value.selected = title
  }
</script>

<template>
  <main>
    <div class="wrapper">
      <h5>{{ data.selected }}</h5>
      <template
        v-for="title in titles"
        :key="title"        
      >
        <p @click.prevent="selectTitle(title)">{{ title }}</p>
      </template>
    </div>
  </main>
</template>

<style scoped>
  h5 {
    font-size: 1.5rem;
  }
</style>