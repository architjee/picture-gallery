<template>
    <li v-for="route in routes" :key="route.path" class="capitalize">
        <RouterLink :to="route.path">
            {{ route.name }}
        </RouterLink>
    </li>
</template>

<script setup lang="ts">
import { routes } from '@/routes'
import { RouterLink } from 'vue-router';
</script>