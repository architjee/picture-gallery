import { useUtilStore } from '@/stores';
import { computed, readonly, ref } from 'vue';

const galleryWidth = ref<number>(0);
const maxColumnPossible = ref<number>(1);
const itemsPerPage  = ref(4);
const columnsRendered = readonly(computed(()=> Math.min(maxColumnPossible.value, itemsPerPage.value)))

export function useGalleryWidth() {
    function setGalleryWidth(width: number) {
        galleryWidth.value = width;
    }

    function getGalleryWidth() {
        return galleryWidth.value;
    }
    function getColumnPreferred() {
        return itemsPerPage.value;
    }

    function setMaxColumnPossible(width: number) {
        maxColumnPossible.value = width;
    }
    function setColumnPreferred(columns: number) {
        itemsPerPage.value = columns;
        useUtilStore().setMaxItemsPerRow(columns);
    }

    function getMaxColumnPossible() {
        return maxColumnPossible.value;
    }



    return {
        columnsRendered,
        galleryWidth,
        setGalleryWidth,
        getGalleryWidth,
        setMaxColumnPossible,
        getMaxColumnPossible,
        getColumnPreferred,
        setColumnPreferred
    };
}
