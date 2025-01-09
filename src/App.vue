<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import TheFooter from '@/components/TheFooter.vue'
import HomePage from '@/pages/HomePage.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col items-center border-2 border-base-content bg-base-100">
    <NavBar></NavBar>
    <div class="grow">
      <HomePage></HomePage>
    </div>
    <TheFooter />
  </div>

</template>

<style scoped></style>
