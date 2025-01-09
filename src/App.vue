<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import TheFooter from '@/components/TheFooter.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="h-screen flex flex-col justify-between items-center border-2 border-base-content bg-base-100">
    <NavBar></NavBar>
    <div class="w-full grow flex flex-col overflow-y-auto">
      <RouterView></RouterView>
    </div>
    <TheFooter />
  </div>

</template>

<style scoped></style>
