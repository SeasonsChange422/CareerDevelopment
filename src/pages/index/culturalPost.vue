<!--
 * @Author: Dhx
 * @Date: 2024-04-30 19:20:17
 * @Description: 
 * @FilePath: \CareerDevelopment\src\pages\index\culturalPost.vue
-->
<template>
    <v-breadcrumbs :items="paths" style="width: 1200px;margin: auto;">
            <template v-slot:title="{ item }">
                {{ item.title.toUpperCase() }}
            </template>
        </v-breadcrumbs>
    <div class="center">
        <div class="contentBox">
            <div class="text-h3">{{ post.title }}</div>
            <div v-html="post.text"></div>
        </div>
    </div>

</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { getCulturalById,getCulturalTypeById } from '@/api/api/culturalApi.ts'
import { CulturalPost } from '@/api/type/culturalType.ts'
import { onMounted, ref } from 'vue';
const router = useRouter()
const post = ref<CulturalPost>({

})
const type = ref<CulturalType>({
    id: '',
    name: '',
})
let culturalPostId = ''
const paths = ref([
    {
        title: '学习',
        disabled: false,
        href: '/cultural',
    },
    {
        title: '',
        disabled: false,
        href: '/',
    },
    {
        title: '',
        disabled: true,
        href: '',
    },
])
onMounted(() => {
    culturalPostId = router.currentRoute.value.query.id as string
    getPostFunc()
})
const getCulturalTypeByIdFunc = function() {
    getCulturalTypeById({id:post.value.typeId}).then((res:any)=>{
        if(res.code == 200) {
            type.value = res.data
            paths.value[1].title = type.value.name
            paths.value[1].href = '/culturalPosts?id=' + type.value.id
        }
    })
}
const getPostFunc = function () {
    getCulturalById({ id: culturalPostId }).then((res: any) => {
        if (res.code == 200) {
            post.value = res.data
            paths.value[2].title = post.value.title
            getCulturalTypeByIdFunc()
        }
    })
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