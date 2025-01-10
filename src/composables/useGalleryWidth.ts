import { ref } from 'vue';

const galleryWidth = ref<number>(0);

export function useGalleryWidth() {
    function setGalleryWidth(width: number) {
        galleryWidth.value = width;
    }

    function getGalleryWidth() {
        return galleryWidth.value;
    }

    return {
        galleryWidth,
        setGalleryWidth,
        getGalleryWidth,
    };
}
