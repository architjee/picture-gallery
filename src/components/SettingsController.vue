<template>
    <div class="d-dropdown d-dropdown-end">
        <div tabindex="0" role="button" class="d-btn d-btn-ghost text-lg d-btn-circle"><i
                class="i-heroicons-cog-20-solid"></i></div>
        <div tabindex="0"
            class="d-menu d-dropdown-content bg-base-100 dark:bg-base-300 rounded-box z-[1] w-52 p-4 shadow">
            <div>
                <p class="text-xs mb-2">
                    Items per page - <span class="font-bold">
                        max(30)
                    </span>
                </p>
                <input :value="getItemsPerPage" type="number" placeholder="Type here"
                    class="d-input d-input-xs d-input-bordered w-full max-w-xs" @change="eventHandler" />
            </div>
            <div class="mt-3">
                <input v-model="rangeModel" type="range" min="1" :max="useGalleryWidth().getMaxColumnPossible()" :value="useGalleryWidth().galleryWidth"
                    class="d-range d-range-xs w-full" step="1" @change="useGalleryWidth().setColumnPreferred(rangeModel)"/>
                <div class="flex w-full justify-between px-2 text-xs">
                    <span v-for="number in useGalleryWidth().getMaxColumnPossible()" :key="number">{{ number }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useGalleryWidth } from '@/composables/useGalleryWidth';
import { useUtilStore } from '@/stores';
const { getItemsPerPage, setItemsPerPage } = useUtilStore()

function eventHandler(e: Event) {
    const inputElement = (e.target as HTMLInputElement);
    const updatedValue = Number(inputElement.value);
    if (updatedValue >= 1 && updatedValue <= 30) {
        setItemsPerPage(updatedValue)
    } else {
        inputElement.value = String(useUtilStore().getItemsPerPage);
    }
}

const rangeModel = defineModel<number>({
    default: useGalleryWidth().columnsRendered.value
});
</script>
