<template>
	<div>
		<label class="grid cursor-pointer place-items-center">
			<input v-model="isDark" type="checkbox" value="dark"
				class="d-toggle d-theme-controller bg-base-content col-span-2 col-start-1 row-start-1"
				@change="toggleTheme" />
			<i class="i-heroicons-sun-solid text-base-100 col-start-1 row-start-1"></i>
			<i class="i-heroicons-moon text-base-100 col-start-2 row-start-1">
			</i>
		</label>
	</div>
</template>

<script lang="ts" setup>
import { useUtilStore } from '@/stores';
import { ref } from 'vue';

const isDark = ref<boolean>(useUtilStore().theme === 'dark');
toggleTheme();

function toggleTheme() {
	useUtilStore().setTheme(isDark.value  ? 'dark' : 'light')
}
</script>