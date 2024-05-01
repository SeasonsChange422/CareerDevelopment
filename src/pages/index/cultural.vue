<!--
 * @Author: Dhx
 * @Date: 2024-04-29 00:53:04
 * @Description: 
 * @FilePath: \CareerDevelopment\src\pages\index\cultural.vue
-->
<template>
    <v-infinite-scroll :item="culturalPosts" :onLoad="load">
        <div class="center">
            <div class="typeContainer">
                <div class="text-h6" style="margin-left: 10px;">种类</div>
                <v-chip v-for="(type, index) in types" :key="index" class="chip" @click="selectType(index)"
                    :color="index == currentTypeIndex ? 'rgba(0,152,103)' : 'rgba(70,222,173)'">
                    {{ type.name }}
                </v-chip>
            </div>
            <div class="postsContainer">
                <PostCardLite v-for="(post, index) in culturalPosts" :key="index" :cultural-post="post">
                </PostCardLite>
            </div>
        </div>
    </v-infinite-scroll>
</template>
<script setup lang="ts">
import { getCulturalTypeList, getCulturalList } from '@/api/api/culturalApi.ts'
import { CulturalType, CulturalPost } from '@/api/type/culturalType.ts'
import { ref } from 'vue';
import PostCardLite from '../../components/postCard-lite.vue';
const types = ref<CulturalType[]>([])
const culturalPosts = ref<CulturalPost[]>([])
const getCulturalPostsForm = ref({
    page: 1,
    limit: 10,
    data: ''
})
const currentTypeIndex = ref(0)
const loaded = ref(true)
const load = async function ({ done }) {
    if(loaded.value){
        done('ok')
        returnv
    }
    loaded.value = true
    getCulturalPostListFunc()
    done('ok')
}
const getCulturalTypeListFunc = function () {
    getCulturalTypeList().then((res: any) => {
        if (res.code == 200) {
            types.value = res.data
        }
    })
}
const selectType = function (index: number) {
    if (currentTypeIndex.value == index) currentTypeIndex.value = -1
    else currentTypeIndex.value = index
    if (currentTypeIndex.value == -1) {
        getCulturalPostsForm.value.data = ''
    } else {
        getCulturalPostsForm.value.data = types.value[currentTypeIndex.value].id
    }
    getCulturalPostsForm.value.page = 1
    culturalPosts.value = []
    getCulturalPostListFunc()
}
const getCulturalPostListFunc = function () {
    getCulturalList(getCulturalPostsForm.value).then((res: any) => {
        if (res.code == 200) {
            culturalPosts.value = culturalPosts.value.concat(res.data)
            getCulturalPostsForm.value.page++
            if(res.data.length==getCulturalPostsForm.value.limit) loaded.value = false
        }
    })
}
getCulturalTypeListFunc()
getCulturalPostListFunc()
</script>
<style scoped>
@import url('@/assets/style/cultural.css');
</style>