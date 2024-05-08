<!--
 * @Author: Dhx
 * @Date: 2024-04-27 16:21:45
 * @Description: 
 * @FilePath: \CareerDevelopment\src\components\Navigation.vue
-->
<template>
    <v-tabs align-tabs="end" v-model="tab" color="rgba(50,202,153)">
        <v-tab @click="$router.push('/sys/posts')" :value="0" style="font-weight: 700;font-size: 16px;">讨论</v-tab>
        <v-tab @click="$router.push('/sys/career')" :value="1" style="font-weight: 700;font-size: 16px;">生涯规划</v-tab>
        <v-tab @click="$router.push('/sys/psychological')" :value="2" style="font-weight: 700;font-size: 16px;">心理测试</v-tab>
        <v-tab @click="$router.push('/sys/cultural')" :value="3" style="font-weight: 700;font-size: 16px;">学习</v-tab>
        <v-tab :value="-1" style="visibility: hidden;"></v-tab>
    </v-tabs>
    <v-tabs-window v-model="tab"></v-tabs-window>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const path = [
    "/sys/posts",
    "/sys/career",
    "/sys/psychological",
    "/sys/cultural"
]
let tab = ref(0)
onMounted(()=>{

    tab.value =path.indexOf(router.currentRoute.value.path as string)
})

</script>
<style scoped>
</style>