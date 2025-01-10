<template>
    <!-- page change network progress indicator -->
    <progress v-show="loading" class="d-progress shrink-0 h-1 w-full"></progress>
    <div class="grow flex overflow-y-auto divide-x-2 divide-base-300">
        <div class="size-full @container overflow-y-scroll">
            <div ref="galleryContainerParent"
                class="w-full h-full grid grow grid-cols-1 @2xl:grid-cols-2 @5xl:grid-cols-3 @7xl:grid-cols-4 gap-4 overflow-y-scroll place-items-center px-4 py-8">
                <ImageCard v-for="image of responseData" :key="image.id" :image-data="image" :intersectionObserverRef
                    class="hover:scale-105 hover:cursor-pointer duration-200" @click="handleImageClick(image)" />
                <div
                    class="grow-0 col-span-1 @2xl:col-span-2 @5xl:col-span-3 @7xl:col-span-4 shrink-0 flex flex-col justify-center py-2">
                    <template v-if="responseData.length">
                        <p class="text-center text-xs my-2">
                            Showing {{ getItemsPerPage }} images per page.
                        </p>
                        <PaginationControls :page="pageMeta.currentPage" />
                    </template>

                    <div v-else class="grow h-full flex flex-col justify-center items-center overflow-clip">
                        <!-- spinner to render when there are no items -->
                        <span class="d-loading d-loading-spinner d-loading-lg"></span>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="width > SCREEN_MD && showSidePanel" class="w-full h-full grow flex flex-col overflow-x-clip">
            <div class="flex w-full justify-end p-4">
                <button class="d-btn d-btn-circle d-btn-outline d-btn-sm" @click="showSidePanel = false">
                    <i class="i-heroicons-x-mark"></i>
                </button>
            </div>
            <div v-if="previewImageRef" :class="{ 'blur-xl': !previewImageRef.isVisible }"
                :style="{ backgroundImage: getBgImage }"
                class="size-full bg-cover overflow-y-hidden bg-no-repeat bg-center">
                <img :src="previewImageRef.download_url" @load="previewImageRef.isVisible = true"
                    class="size-full object-contain backdrop-blur-xl"
                    :class="previewImageRef.isVisible ? 'block' : 'hidden'" alt="">
            </div>
            <div class="grow">
                <div class="mx-auto w-fit text-center">
                    <a class="text-info hover:cursor-pointer hover:underline">{{ previewImageRef.url }}</a>
                    <p class="text-sm">
                        Size : {{ previewImageRef.width }} x {{ previewImageRef.height }}
                    </p>
                    <p class="italic">
                        Author : {{ previewImageRef.author }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import PaginationControls from '@/components/PaginationControls.vue';
import ImageCard from '@/components/ImageCard.vue';
import axios from 'axios';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import type { ImageInterface } from '@/types';
import { useWindowResize } from './composable';
import { useGalleryWidth } from '@/composables/useGalleryWidth';
import { useUtilStore } from '@/stores';
import { storeToRefs } from 'pinia';

const { width } = useWindowResize();
const { setGalleryWidth } = useGalleryWidth();
const { getItemsPerPage } = storeToRefs(useUtilStore());

const SCREEN_MD = 768;
const props = defineProps({
    page: {
        type: String,
        required: false,
        default: '1',
    },
});

const pageMeta = computed(() => ({
    currentPage: Number(props.page),
    totalItems: 100,
}));

const loading = ref<boolean>(false);
const intersectionObserverRef = ref<IntersectionObserver>();
const resizeObserverRef = ref<ResizeObserver>();
const galleryContainerParent = ref<HTMLDivElement>();

const responseData = ref<Array<ImageInterface & { isVisible: boolean }>>([]);
const previewImageRef = ref<ImageInterface & { isVisible: boolean }>({
    id: "2",
    author: "Alejandro Escamilla",
    width: 5000,
    height: 3333,
    url: "https://unsplash.com/photos/N7XodRrbzS0",
    download_url: "https://picsum.photos/id/2/5000/3333",
    isVisible: false
});

watch(getItemsPerPage, (itemsPerPageValue?: number) => {
    loading.value = true;
    const newPage = useRoute()?.query?.page || '1';
    fetchImagesData(newPage as string, itemsPerPageValue ?? 30);
});

async function fetchImagesMetaData() {
    await axios.get(`https://picsum.photos/v2/list?limit=100`);
}

async function fetchImagesData(page: string, itemsPerPage: number) {
    const response = await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=${itemsPerPage}`);
    responseData.value = response.data;
    observeImages();
    loading.value = false;
}

const isIntersectingCallback: IntersectionObserverCallback = (entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const imageId = Number(entry.target.getAttribute('data-image-id'));
            const image = responseData.value.find(img => Number(img.id) === imageId);
            if (image) {
                image.isVisible = true;
            }
            observer.unobserve(entry.target);
        }
    });
};

const resizeObserverCallback: ResizeObserverCallback = (entries) => {
    entries.forEach((entry) => {
        const width = entry.borderBoxSize[0].inlineSize;
        setGalleryWidth(width);
    });
};

function observeImages() {
    if (intersectionObserverRef.value) {
        document.querySelectorAll('[data-image="image"]').forEach((element) => {
            intersectionObserverRef.value?.observe(element);
        });
    }
}

const showSidePanel = ref(false);

onMounted(() => {
    loading.value = true;
    fetchImagesMetaData();
    fetchImagesData(props.page, getItemsPerPage.value);
    if (galleryContainerParent?.value) {
        const options = {
            root: galleryContainerParent?.value,
            rootMargin: "0px",
        };
        intersectionObserverRef.value = new IntersectionObserver(isIntersectingCallback, options);
        resizeObserverRef.value = new ResizeObserver(resizeObserverCallback);
        resizeObserverRef.value.observe(galleryContainerParent.value);
        observeImages();
        loading.value = false;
    }
});

onUnmounted(() => {
    intersectionObserverRef.value?.disconnect();
});

onBeforeRouteUpdate((to, _from, next) => {
    loading.value = true;
    const newPage = to?.query.page || '1';
    fetchImagesData(newPage as string, getItemsPerPage.value);
    next();
});

function handleImageClick(image: ImageInterface) {
    if (image.id !== previewImageRef.value.id) {
        previewImageRef.value = { ...image, isVisible: false };
        showSidePanel.value = true;
    } else {
        showSidePanel.value = !showSidePanel.value;
    }
}

const getBgImage = computed(() => `url(https://picsum.photos/id/${previewImageRef.value.id}/30/20)`);
</script>
