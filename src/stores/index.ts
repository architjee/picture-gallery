import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUtilStore = defineStore("util", () => {
    const itemsPerPage = ref<number>(30);
    const theme = ref<'light' | 'dark'>();

    function setItemsPerPage(newItems: number) {
        itemsPerPage.value = newItems;
    }
    function setTheme(newTheme: 'light' | 'dark') {
        theme.value = newTheme;
        document.documentElement.setAttribute('data-theme', theme.value);
    }
    const getItemsPerPage = computed(() => itemsPerPage.value);
    return {
        itemsPerPage,
        getItemsPerPage,
        theme,
        setTheme,
        setItemsPerPage
    };
}, {
    persist: {
        storage: localStorage,
        pick: ['itemsPerPage', 'theme'],
    },
});
