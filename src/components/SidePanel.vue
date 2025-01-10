<template>
    <Teleport to="#modal_box_content" :disabled="!isMobile">
        <div v-if="showSidePanel" class="w-full h-full grow flex flex-col overflow-x-clip">
            <div class="flex w-full justify-end p-4">
                <form method="dialog">
                    <button class="d-btn d-btn-sm d-btn-circle d-btn-outline right-2 top-2"
                        @click="handleClose">
                        <i class="i-heroicons-x-mark"></i>
                    </button>
                </form>
            </div>
            <div v-if="props.previewImageData" :class="{ 'blur-xl': !isVisible }"
                :style="{ backgroundImage: getBgImage }"
                class="size-full bg-cover overflow-y-hidden bg-no-repeat bg-center">
                <img :src="props.previewImageData.download_url" @load="isVisible = true"
                    class="size-full object-contain backdrop-blur-xl" :class="isVisible ? 'block' : 'hidden'" alt="" :key="props.previewImageData.download_url">
            </div>
            <div class="grow">
                <div class="mx-auto w-fit text-center">
                    <a class="text-info hover:cursor-pointer hover:underline">{{ props.previewImageData?.url }}</a>
                    <p class="text-sm">
                        Size : {{ props.previewImageData?.width }} x {{ props.previewImageData?.height }}
                    </p>
                    <p class="italic">
                        Author : {{ props.previewImageData?.author }}
                    </p>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import { useWindowResize } from '@/composables/useWIndowResize';
import type { ImageInterface } from '@/types';
import { computed, onMounted, ref, watch } from 'vue';
const { width } = useWindowResize();
const SCREEN_MD = 768;


const props = defineProps<{ previewImageData?: ImageInterface }>();
const isVisible = ref<boolean>(false);

const showSidePanel = defineModel<boolean>();
const dialogElementRef =  ref<HTMLDialogElement>()

const getBgImage = computed(() => `url(https://picsum.photos/id/${props.previewImageData?.id}/30/20)`);
const isMobile = computed(()=> width.value < SCREEN_MD);

watch(isMobile, (newValue) => {
    dialogElementRef.value?.showModal();
    console.log('watcher causeing',dialogElementRef.value);
    if(!newValue){
        dialogElementRef.value?.close();
    }
})


function handleClose() {
    if (isMobile.value && dialogElementRef.value?.open) {
        dialogElementRef.value?.close();
    }
    showSidePanel.value = false;
}
onMounted(()=>{
    dialogElementRef.value = document.getElementById('teleportableModal') as HTMLDialogElement;
    if(showSidePanel && isMobile.value){
        dialogElementRef.value?.showModal(); 
    }else{
        console.log('Something');
    }
})

</script>
