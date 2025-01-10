import { ref } from 'vue';

const galleryWidth = ref<number>(0);
const maxColumnPossible = ref<number>(1);

export function useGalleryWidth() {
    function setGalleryWidth(width: number) {
        galleryWidth.value = width;
    }

    function getGalleryWidth() {
        return galleryWidth.value;
    }

    function setMaxColumnPossible(width: number) {
        maxColumnPossible.value = width;
    }

    function getMaxColumnPossible() {
        return maxColumnPossible.value;
    }

    return {
        galleryWidth,
        setGalleryWidth,
        getGalleryWidth,
        setMaxColumnPossible,
        getMaxColumnPossible,
    };
}
