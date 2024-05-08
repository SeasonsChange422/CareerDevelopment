<!--
 * @Author: Dhx
 * @Date: 2024-05-04 15:47:55
 * @Description: 
 * @FilePath: \CareerDevelopment\src\pages\index\culturalPosts.vue
-->
<template>
    <div style="background-color: rgba(239,242,249);">
        <v-infinite-scroll :item="posts" :onLoad="load">
        <v-breadcrumbs :items="paths" style="width: 1200px;margin: auto;">
            <template v-slot:title="{ item }">
                {{ item.title.toUpperCase() }}
            </template>
        </v-breadcrumbs>
        <div class="center">
            <div class="postList">
                <culturalPostCard v-for="(post, index) in posts" :key="index" :cultural-post="post">
                </culturalPostCard>
            </div>

        </div>
    </v-infinite-scroll>
    </div>
    
</template>
<script setup lang="ts">
import { listCulturalPost,getCulturalTypeById } from '@/api/api/culturalApi.ts'
import { CulturalType, CulturalPost } from '@/api/type/culturalPostType.ts'
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const getPostListForm = ref({
    page: 1,
    limit: 10,
    data: ''
})
const type = ref<CulturalType>({
    id: '',
    name: '',
})
const posts = ref<CulturalPost[]>([])
const getPostListFunc = function () {
    listCulturalPost(getPostListForm.value).then((res: any) => {
        if (res.code == 200) {
            posts.value = posts.value.concat(res.data)
            getPostListForm.value.page++
            if (res.data.length == getPostListForm.value.limit) loaded.value = false // 后面还有数据
        }
    })
}
const getCulturalTypeByIdFunc = function() {
    getCulturalTypeById({id:getPostListForm.value.data}).then((res:any)=>{
        if(res.code == 200) {
            type.value = res.data
            paths.value[1].title = type.value.name
        }
    })
}
const paths = ref([
    {
        title: '学习',
        disabled: false,
        href: '/sys/cultural',
    },
    {
        title: '',
        disabled: true,
        href: '',
    },
])
const loaded = ref(true)
const load = async function ({ done }) {
    if (loaded.value) {
        done('ok')
        return
    }
    loaded.value = true
    getPostListFunc()
    done('ok')
}
onMounted(() => {
    setTimeout(() => {
        getPostListForm.value.data = router.currentRoute.value.query.id as string
        getPostListFunc()
        getCulturalTypeByIdFunc()
    }, 500)
})

</script>
<style scoped>
.center {
    position: relative;
    width: 1200px;
    min-height: 100vh;
    margin: auto;
    padding-top: 20px;
}

.postList {
    position: relative;
    width: 100%;
    min-height: 400px;
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    margin-top: 40px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}
</style>