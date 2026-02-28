<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue';
import { pullUserInfo } from '@/api/account';
import { useUserStore } from '@/store/userStore';

const userStore = useUserStore();

// 获取用户信息
const handlerPullUserInfo = async () => {
  try {
    const response = await pullUserInfo();
    console.log('获取用户信息响应 => ', response);
    if (response.status === 200) {
      userStore.setUserInfo(response.data);
    } else {
      throw new Error(response.data.detail);
    }
  } catch (error) {
    console.error(error);
  } finally {
    // 设置是否已经拉取用户信息
    userStore.setHasPullUserInfo(true);
  }
};

onMounted(() => {
  handlerPullUserInfo();
});
</script>

<style scoped></style>
