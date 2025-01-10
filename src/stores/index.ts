import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAuthStore = defineStore("auth", () => {
    const user = ref<number>();
    const getUser = computed(() => user.value);
    return {
        user,
        getUser,
    };
}, {
    persist: {
        storage: localStorage,
        pick: ['user'],
    },
});
