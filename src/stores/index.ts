import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUtilStore = defineStore("util", () => {
    const itemsPerPage = ref<number>(30);
    const theme = ref<'light' | 'dark'>();
    const maxItemsPerRow = ref<number>(4);

    function setItemsPerPage(newItems: number) {
        itemsPerPage.value = newItems;
    }
    function setTheme(newTheme: 'light' | 'dark') {
        theme.value = newTheme;
        document.documentElement.setAttribute('data-theme', theme.value);
    }
    function setMaxItemsPerRow(items: number) {
        maxItemsPerRow.value = items;
    }
    const getItemsPerPage = computed(() => itemsPerPage.value);
    const getMaxItemsPerRow = computed(() => maxItemsPerRow.value)
    return {
        itemsPerPage,
        getItemsPerPage,
        theme,
        setTheme,
        setItemsPerPage,
        getMaxItemsPerRow,
        setMaxItemsPerRow,
    };
}, {
    persist: {
        storage: localStorage,
        pick: ['itemsPerPage', 'theme'],
    },
});
