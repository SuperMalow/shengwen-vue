// index.js

import { defineStore } from "pinia";

export const useHaloStore = defineStore("useHalo", {
  state: () => ({
    // 可直接 store.count 访问
    count: 0,
  }),
  getters: {
    // 类似 computed 计算属性 可直接 store.doubleCount 访问
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    // 类似 methods 方法 可直接 store.increment() 访问
    increment() {
      this.count++;
    },
  },
});
