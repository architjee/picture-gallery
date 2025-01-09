<template>
    <div class="d-join">
        <RouterLink v-if="!prevDisabled" :to="{ path: '/', query: { page: props.page - 1 } }">
            <button class="d-join-item d-btn " :class="{ 'd-btn-disabled': prevDisabled }">«</button>
        </RouterLink>
        <button class="d-join-item d-btn">Page {{ page }}</button>
        <RouterLink :to="{ path: '/', query: { page: props.page + 1 } }" v-if="!props.nextDisabled">
            <button class="d-join-item d-btn">»</button>
        </RouterLink>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
const props = defineProps<{
    page: number,
    nextDisabled?: boolean,
}>();
const prevDisabled = computed(() => props.page === 1);
</script>
