<template>
    <progress v-show="loading" class="d-progress shrink-0 h-1 w-full"></progress>
    <div class="grow flex flex-col overflow-y-auto">
        <div ref="galleryContainerParent"
            class="grid grow grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-scroll place-items-center px-4 py-8">
            <ImageCard v-for="image of responseData" key="image.id" :image-data="image" :observerRef
                class="hover:scale-105 duration-200" />
            <div class="grow-0 col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4 shrink-0 flex flex-col justify-center py-2">
                <PaginationControls v-if="responseData.length" :page="pageMeta.currentPage" />
                <div v-else
                    class="grow h-full flex flex-col justify-center items-center overflow-clip">
                    <!-- spinner to render when there are no items -->
                    <span class="d-loading d-loading-spinner d-loading-lg"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import PaginationControls from '@/components/PaginationControls.vue';
import ImageCard from '@/components/ImageCard.vue';
import axios from 'axios';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router';
import type { ImageInterface } from '@/types';

// Props
const props = defineProps({
    page: {
        type: String,
        required: false,
        default: '1',
    },
})

// state
const itemsPerPage = ref(10);
const pageMeta = computed(() => ({
    currentPage: Number(props.page),
    totalPages: Math.ceil(100 / itemsPerPage.value),
    totalItems: 100,
    itemsPerPage: itemsPerPage.value,
}));
const loading = ref<boolean>(false);
const observerRef = ref<IntersectionObserver>();
const galleryContainerParent = ref<HTMLDivElement>();
const NumberOfItems = 30;
const responseData = ref<Array<ImageInterface & { isVisible: boolean }>>([]);

async function fetchImagesMetaData() {
    await axios.get(`https://picsum.photos/v2/list?limit=100`);
}

async function fetchImagesData(page: string) {
    const response = await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=${NumberOfItems}`);
    responseData.value = response.data;
    observeImages();
}

const isIntersectingCallback: IntersectionObserverCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const imageId = Number(entry.target.getAttribute('data-image-id'));
            const image = responseData.value.find(img => Number(img.id) === imageId);
            if (image) {
                console.log('Image with id is visible', image.id);
                image.isVisible = true;
            }
            observer.unobserve(entry.target);
        }
    });
}

function observeImages() {
    if (observerRef.value) {
        document.querySelectorAll('[data-image="image"]').forEach((element) => {
            observerRef.value?.observe(element);
        });
    }
}

onMounted(() => {
    loading.value = true;
    fetchImagesMetaData();
    fetchImagesData(props.page);
    const options = {
        root: galleryContainerParent?.value,
        rootMargin: "0px", // This can be changed based on the requirement on how much offset we wish to preload
    };
    console.log(galleryContainerParent.value, galleryContainerParent.value?.getBoundingClientRect().height);
    const observer = new IntersectionObserver(isIntersectingCallback, options);
    observerRef.value = observer;
    observeImages();
    loading.value = false;
});

onUnmounted(() => {
    if (observerRef.value) {
        observerRef.value?.disconnect();
    }
})

// Use beforeRouteUpdate to handle route changes
onBeforeRouteUpdate((to, _from, next) => {
    loading.value = true;
    const newPage = to.query.page || '1';
    fetchImagesData(newPage as string).then(() => loading.value = false);
    next();
});
</script>