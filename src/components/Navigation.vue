<template>
    <v-tabs align-tabs="end" v-model="tab" color="rgba(50,202,153)">
        <v-tab @click="$router.push('/posts')">讨论</v-tab>
        <v-tab @click="$router.push('/career')">生涯规划</v-tab>
        <v-tab @click="$router.push('/test')">心理测试</v-tab>
        <v-tab @click="$router.push('/cultural')">学习</v-tab>
    </v-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const path = [
    "/posts",
    "/career",
    "/test",
    "/cultural"
]
const tab = ref(path.indexOf(router.currentRoute.value.path))
</script>
<style scoped></style>