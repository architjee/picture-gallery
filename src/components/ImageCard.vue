<template>
    <div ref="imageCardElementRef" class="d-card d-card-compact bg-base-100 w-[300px] shadow-xl" data-image="image"
        :data-image-id="props.imageData.id">
        <figure>
            <div v-if="imageData.isVisible" class="w-[300px] h-[200px]"
                :style="`background-image: ${`https://picsum.photos/id/${props.imageData.id}/30/20`}`">
                <img :src='`https://picsum.photos/id/${props.imageData.id}/300/200`' loading="lazy"
                    class="w-[300px] h-[200px]" alt="Shoes" />
            </div>
            <div v-else class="w-[300px] h-[200px] bg-green-50">
            </div>
        </figure>
        <div class="d-card-body">
            <h2 class="text-lg truncate">Author - {{ props.imageData.author }} {{ props.imageData.isVisible ? '**' : '?'
                }}
            </h2>
            <p class="truncate"> Source URL - {{ props.imageData.url }}</p>
            <!-- <div class="d-card-actions justify-end">
                <button class="d-btn d-btn-primary">Buy Now</button>
            </div> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ImageInterface } from '@/types';
import { onMounted, ref } from 'vue';

const props = defineProps<{
    imageData: ImageInterface & { isVisible: boolean }
    observerRef?: IntersectionObserver;
}>();

const imageCardElementRef = ref<HTMLDivElement>();
onMounted(() => {
    if (imageCardElementRef.value && props.observerRef) {
        props.observerRef.observe(imageCardElementRef.value);
    }
})

</script>

<style scoped></style>