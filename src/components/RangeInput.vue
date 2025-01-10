<template>
    <div>

        {{ modelValue }} - galleryWidth - {{ galleryWidth }} maxAllowedLimit - {{ getMaxAllowedLimit(galleryWidth) }}
        <input v-model="modelValue" type="range" min="1" :max="props.limit" class="d-range" step="1" />
        <div class="flex w-full justify-between px-2 text-xs">
            <span v-for="number of props.limit" :key="number">{{number}}</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useGalleryWidth } from '@/composables/useGalleryWidth';

const props = defineProps<{
    limit: number;
}>();

const modelValue = defineModel();
const maxImagesAllowedMap = {
    0: 1,
    672: 2,
    1024: 3,
    1280: 4,
}
const { galleryWidth } = useGalleryWidth();
function getMaxAllowedLimit(screenSize: number): number {
    // const keys = Object.keys(maxImagesAllowedMap) as keyof typeof maxImagesAllowedMap;
    const SCREEN_SIZES : Array<keyof typeof maxImagesAllowedMap> = [1280, 1024, 672, 0];
    for (const key of SCREEN_SIZES) {
        if (screenSize >= key) {
            return maxImagesAllowedMap[key];
        }
    }
    return 1; // Default value if no match is found
}


</script>

<!-- <style scoped></style> -->