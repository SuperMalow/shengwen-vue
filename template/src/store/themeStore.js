// dark and light mode

import { defineStore } from 'pinia';

export const useDarkModeStore = defineStore('darkMode', {
    state: () => ({
        theme: 'dark',
    }),
    getters: {
        isDarkTheme: (state) => state.theme === 'dark',
    },
    actions: {
        setTheme(theme) {
            document.documentElement.classList.toggle('dark', theme === 'dark');
            document.documentElement.setAttribute('data-theme', theme);
        },
        toggleTheme() {
            this.theme = this.isDarkTheme ? 'light' : 'dark';
            this.setTheme(this.theme);
        }
    }
});