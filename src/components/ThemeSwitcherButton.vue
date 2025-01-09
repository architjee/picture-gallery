<template>
	<div>
		<button class="d-btn d-btn-circle text-lg" @click="toggleTheme">
			<i v-if="theme === 'dark'" class="i-heroicons-sun"></i>
			<i v-else class="i-heroicons-moon"></i>
		</button>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';


const theme = ref<'light' | 'dark'>('light');
function toggleTheme() {
	theme.value = theme.value === 'light' ? 'dark' : 'light';
}
</script>