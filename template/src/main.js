import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
// 为避免最后打包将 element-plus 打包进主包，推荐在具体的组件中按需引入
// import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { createPinia } from "pinia";
const pinia = createPinia();

createApp(App).use(router).use(pinia).mount("#app");
