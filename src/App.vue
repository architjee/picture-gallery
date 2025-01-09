<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import TheFooter from '@/components/TheFooter.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col items-center border-2 border-base-content bg-base-100">
    <NavBar></NavBar>
    <div class="grow">
      <h1 class="text-3xl font-bold underline">
        Hello world!
      </h1>
    </div>
    <TheFooter />
  </div>

</template>

<style scoped></style>
