<template>
    <div ref="imageCardElementRef" class="d-card d-card-compact bg-base-100 w-[300px] shadow-xl" data-image="image"
        :data-image-id="props.imageData.id">
        <figure>
            <div class="w-[300px] h-[200px] bg-cover " :class="{ 'blur-xl': !imageData.isVisible }"
                :style="{ backgroundImage: getBgImage }">
                <img v-if="imageData.isVisible" :src='`https://picsum.photos/id/${props.imageData.id}/300/200`'
                    loading="lazy" class="w-[300px] h-[200px]" alt="Shoes" />
                <div v-else class="w-[300px] h-[200px]">
                </div>
            </div>
        </figure>
        <div class="d-card-body gap-y-5">
            <h2 class="text-lg truncate">Author - {{ props.imageData.author }}</h2>
            <div>
                <a :href="props.imageData.url" class="hover:underline hover:text-info text-sm"
                    target="_blank">
                    <p class="truncate">
                        {{ props.imageData.url }}
                    </p>
                </a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ImageInterface } from '@/types';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

const props = defineProps<{
    imageData: ImageInterface & { isVisible: boolean }
    intersectionObserverRef?: IntersectionObserver;
}>();

const imageCardElementRef = ref<HTMLDivElement>();
onMounted(() => {
    if (imageCardElementRef.value && props.intersectionObserverRef) {
        props.intersectionObserverRef.observe(imageCardElementRef.value);
    }
})
const getBgImage = computed(() => `url(https://picsum.photos/id/${props.imageData.id}/30/20)`)

onBeforeUnmount(() => {
    if (imageCardElementRef.value && props.intersectionObserverRef) {
        props.intersectionObserverRef.unobserve(imageCardElementRef.value);
    }
})
</script>

<style scoped></style>