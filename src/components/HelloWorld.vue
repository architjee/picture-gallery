<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <div>
    Hello owrld {{ msg }}
  </div>
</template>

<style scoped>

</style>
