<template>
    <div ref="imageCardElementRef" class="d-card d-card-compact bg-base-100 w-[300px] shadow-xl" data-image="image" :data-image-id="props.imageData.id">
        <figure>
            <img  v-if="imageData.isVisible" :src='`https://picsum.photos/id/${props.imageData.id}/300/200`' loading="lazy" class="w-[300px] h-[200px]" alt="Shoes" />
            <div v-else class="w-[300px] h-[200px] bg-green-50">
            </div>
        </figure>
        <div class="d-card-body">
            <h2 class="d-card-title">Author - {{ props.imageData.author }} {{ props.imageData.isVisible ? '**':'?'}}</h2>
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
    imageData: ImageInterface & {isVisible: boolean}
    observerRef?: IntersectionObserver;
}>();

const imageCardElementRef = ref<HTMLDivElement>();
onMounted(()=>{
    if(imageCardElementRef.value && props.observerRef){
        props.observerRef.observe(imageCardElementRef.value);
    }
})

</script>

<style scoped></style>