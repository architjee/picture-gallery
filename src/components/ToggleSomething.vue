<template>
    <div class="d-dropdown d-dropdown-end">
        <div tabindex="0" role="button" class="d-btn d-btn-ghost d-btn-sm m-1">Limit</div>
        <div tabindex="0"  class="d-menu d-dropdown-content bg-base-100 dark:bg-base-300 rounded-box z-[1] w-52 px-6 py-4 shadow">
            <RangeInput />
        </div>
    </div>
</template>

<script lang="ts" setup>
import RangeInput from '@/components/RangeInput.vue';

</script>

<!-- <style scoped></style> -->