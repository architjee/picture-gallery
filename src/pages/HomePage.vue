<template>
    <div ref="galleryContainerParent" class="h-full overflow-y-auto">
        <div ref="galleryContainer" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-scroll place-items-center px-4">
            <ImageCard v-for="image of responseData" key="image.id" :image-data="image" :observerRef />
        </div>
    </div>
</template>

<script setup lang="ts">
import ImageCard from '@/components/ImageCard.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import type { ImageInterface } from '@/types';
const PageNumber = 1;
const NumberOfItems = 30;
const responseData = ref<Array<ImageInterface & {isVisible: boolean}>>([]);

async function fetchImagesMetaData() {
    const response = await axios.get(`https://picsum.photos/v2/list?page=${PageNumber}&limit=${NumberOfItems}`);
    responseData.value = response.data;
}

const galleryContainer = ref<HTMLDivElement>();
const galleryContainerParent = ref<HTMLDivElement>();
// onBeforeMount(() => {
//     console.log(galleryContainer.value);
// });

const observerRef = ref<IntersectionObserver>();
const logme: IntersectionObserverCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    console.log(entries, 'Entries', entries.length);
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            console.log('Target with id', entry.target.getAttribute('data-image-id'), 'is intersecting');
            responseData.value.forEach((image) => {
                if (Number(image.id) === Number(entry.target.getAttribute('data-image-id'))) {
                    console.log('Image with id is visible', image.id);
                    image.isVisible = true;
                }
            }); 
            observer.unobserve(entry.target);
        }
        // entry.isIntersecting? console.log('Intersecting') : console.log('Not Intersecting');
    });
}
onMounted(() => {
    fetchImagesMetaData();
    console.log();

    document.querySelectorAll('[data-image="image"]').forEach((element) => {
        observer.observe(element);
    });
    console.log('Bounds of root are ', galleryContainerParent?.value);

    console.log(document.querySelectorAll('[data-image="image"]'));
    const options = {
        root: galleryContainerParent?.value,
        rootMargin: "0px",
        // threshold: 1.0,
    };
    const observer = new IntersectionObserver(logme, options);
    observerRef.value = observer;

});
</script>

<style scoped></style>