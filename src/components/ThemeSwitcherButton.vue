<template>
	<div>
		<label class="grid cursor-pointer place-items-center">
			<input type="checkbox" value="dark"
				class="d-toggle d-theme-controller bg-base-content col-span-2 col-start-1 row-start-1" @click="toggleTheme" />
			<i class="i-heroicons-sun-solid text-base-100 col-start-1 row-start-1"></i>
			<i class="i-heroicons-moon text-base-100 col-start-2 row-start-1">
			</i>
		</label>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const theme = ref<'light' | 'dark'>('light');
function toggleTheme() {
	theme.value = theme.value === 'light' ? 'dark' : 'light';
	document.documentElement.setAttribute('data-theme', theme.value);
}
</script>