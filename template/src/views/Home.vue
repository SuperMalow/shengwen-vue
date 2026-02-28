<template>
    <div class="flex justify-center items-center min-h-screen p-5">
        <el-card class="max-w-lg w-full">
            <template #header>
                <div class="flex justify-center items-center">
                    <h1>测试卡片</h1>
                </div>
            </template>
            <div class="flex justify-center items-center">
                <!-- dark mode toggle -->
                <div class="flex justify-center items-center">
                    <el-button @click="darkModeStore.toggleTheme()">
                        <el-icon>
                            <Sunny v-if="isDarkTheme" />
                            <Moon v-else />
                        </el-icon>
                    </el-button>
                </div>
            </div>
            <template #footer>
                <div class="flex justify-center items-center">
                    <h1>测试卡片底部</h1>
                </div>
            </template>
        </el-card>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useDarkModeStore } from '@/store/themeStore.js';
import { Sunny, Moon } from '@element-plus/icons-vue';
import { ElCard, ElButton, ElIcon } from 'element-plus';

const darkModeStore = useDarkModeStore();

const isDarkTheme = computed(() => darkModeStore.isDarkTheme);

</script>

<style scoped></style>