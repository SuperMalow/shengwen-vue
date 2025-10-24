<template>
    <div class="flex justify-center items-center min-h-screen p-5">
        <el-card class="max-w-lg w-full">
            <template #header>
                <div class="flex justify-center items-center">
                    <h1>测试卡片</h1>
                </div>
            </template>
            <div class="flex justify-center items-center">
                <el-button type="primary" @click="handleClick">测试按钮</el-button>
            </div>
            <template #footer>
                <div class="flex justify-center items-center">
                    <div class="mr-4">
                        计数: {{ count }}
                    </div>
                    <div class="ml-4">
                        两倍计数: {{ haloStore.doubleCount }}
                    </div>
                </div>
            </template>
        </el-card>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useHaloStore } from '@/store';
const haloStore = useHaloStore();

const count = ref(haloStore.count);

const handleClick = () => {
    haloStore.increment();
    count.value++;
};

</script>

<style scoped></style>