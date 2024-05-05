<!--
 * @Author: Dhx
 * @Date: 2024-05-01 17:36:07
 * @Description: 
 * @FilePath: \CareerDevelopment\src\pages\index\details.vue
-->
<template>
    <v-breadcrumbs :items="paths" style="width: 1200px;margin: auto;">
        <template v-slot:title="{ item }">
            {{ item.title.toUpperCase() }}
        </template>
    </v-breadcrumbs>
    <div class="center">
        <div class="contentBox">
            <div class="text-h3">{{ item.name }}</div>
            <div v-html="item.description"></div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getCareer } from '@/api/api/careerApi.ts'
import { getPsychological } from '@/api/api/psychologicalApi.ts'
const router = useRouter();
const type = ref('')
const id = ref('')
const item = ref<{
    id: string;
    name: string;
    img: string;
    description: string;
}>({
    id: '',
    name: '',
    img: '',
    description: ''
})
const paths = ref([
    {
        title: '首页',
        disabled: false,
        href: '/',
    },
    {
        title: '详情',
        disabled: true,
        href: '',
    },
])
onMounted(() => {
    type.value = router.currentRoute.value.query.type as string
    id.value = router.currentRoute.value.query.id as string
    if(type.value == 'career'){
        paths.value[0].title = '职业'
        paths.value[0].href = '/career'
    } else if(type.value == 'psychological') {
        paths.value[0].title = '心理'
        paths.value[0].href = '/psychological'
    }
    setTimeout(() => {
        getItemFunc()
    }, 500)
})
const getItemFunc = function () {
    if (type.value == 'career') {
        getCareer({ id: id.value }).then((res: any) => {
            if (res.code == 200) {
                item.value = res.data
            }
        })
    } else if (type.value == 'psychological') {
        getPsychological({ id: id.value }).then((res: any) => {
            if (res.code == 200) {
                item.value = res.data
            }
        })
    }
}
</script>
<style scoped>
.center {
    position: relative;
    width: 1200px;
    min-height: 100vh;
    margin: auto;
    padding-top: 20px;
}


.contentBox {
    position: relative;
    width: 100%;
    min-height: 200px;
    background-color: white;
    border-radius: 20px;
    padding: 20px;
    margin-top: 40px;
}
</style>