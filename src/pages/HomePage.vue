<template>
    <!-- page change network progress indicator -->
    <progress v-show="loading" class="d-progress shrink-0 h-1 w-full"></progress>
    <div class="grow flex overflow-y-auto divide-x-2 divide-base-300">
        <div class="size-full @container overflow-y-scroll">
            <!-- grid-cols-1 @2xl:grid-cols-2 @5xl:grid-cols-3 @7xl:grid-cols-4 -->
            <div ref="galleryContainerParent"
                class="w-full h-full grid grow @2xl:[--grid-cols:2] @5xl:[--grid-cols:3] @7xl:[--grid-cols:4] gap-4 overflow-y-scroll place-items-center px-4 py-8"
                style="grid-template-columns: repeat(var(--grid-cols, 1), minmax(0, 1fr));">
                <ImageCard v-for="image of responseData" :key="image.id" :image-data="image" :intersectionObserverRef
                    class="hover:scale-105 hover:cursor-pointer duration-200" @click="handleImageClick(image)" />
                <!-- col-span-1 @2xl:col-span-2 @5xl:col-span-3 @7xl:col-span-4 -->
                <div class="grow-0  shrink-0 flex flex-col justify-center py-2"
                    style="grid-column: span var(--grid-cols, 1) / span var(--grid-cols, 1);">
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
        <SidePanel v-if="showSidePanel" v-model="showSidePanel" :previewImageData="previewImageRef!"
            @update:modelValue="closeSidePanel">
        </SidePanel>
    </div>
    <!-- Open the modal using ID.showModal() method -->
</template>

<script setup lang="ts">
import PaginationControls from '@/components/PaginationControls.vue';
import ImageCard from '@/components/ImageCard.vue';
import axios from 'axios';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import type { ImageInterface } from '@/types';
import { useGalleryWidth } from '@/composables/useGalleryWidth';
import SidePanel from '@/components/SidePanel.vue';
import { useUtilStore } from '@/stores';
import { storeToRefs } from 'pinia';

const { setGalleryWidth } = useGalleryWidth();
const { getItemsPerPage } = storeToRefs(useUtilStore());

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
const previewImageRef = ref<ImageInterface>();

watch(getItemsPerPage, (itemsPerPageValue?: number) => {
    loading.value = true;
    const newPage = useRoute()?.query?.page || '1';
    fetchImagesData(newPage as string, itemsPerPageValue ?? 30);
});

async function fetchImagesData(page: string, itemsPerPage: number) {
    try {
        const response = await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=${itemsPerPage}`);
        responseData.value = response.data;
        observeImages();
        loading.value = false;
    } catch (error) {
        console.error('An error occured while fetching data from the API', error);
    }
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
    if (image.id !== previewImageRef?.value?.id) {
        previewImageRef.value = { ...image };
        showSidePanel.value = true;
    } else {
        showSidePanel.value = !showSidePanel.value;
    }
}

function closeSidePanel() {
    previewImageRef.value = undefined;
    showSidePanel.value = false;
}

</script>
