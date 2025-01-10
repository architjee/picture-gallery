import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUtilStore = defineStore("util", () => {
    const itemsPerPage = ref<number>(30);

    function setItemsPerPage(newItems:number) {
        itemsPerPage.value = newItems;
    }
    const getItemsPerPage = computed(()=> itemsPerPage.value);
    return {
        itemsPerPage,
        getItemsPerPage,
        setItemsPerPage
    };
}, {
    persist: {
        storage: localStorage,
        pick: ['itemsPerPage'],
    },
});
