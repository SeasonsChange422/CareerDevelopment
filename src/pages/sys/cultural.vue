<!--
 * @Author: Dhx
 * @Date: 2024-04-29 00:53:04
 * @Description: 
 * @FilePath: \CareerDevelopment\src\pages\sys\cultural.vue
-->
<template>
    <div style="background-color: white;">
        <div class="picContainer">
            <div class="title">
                智慧社区青少年文化教育服务系统
            </div>
            <div class="searchContainer">
                <div class="search-title">搜索课程</div>
                <div class="search-center">
                    <v-text-field append-inner-icon="mdi-magnify" v-model="searchInput" density="compact" label="搜索"
                        variant="solo" hide-details single-line @input="handleInputChange"></v-text-field>
                    <div v-if="searchInput!=''"
                    style="position: absolute;width: 100%;min-height:50px;max-height: 240px;background-color: white;top: 50px;border-radius: 5px;padding: 5px;">
                        <v-card hover v-for="item in searchResult.slice(0,5)" :key="item.id" style="display: flex;" @click="$router.push('/sys/culturalPost?id='+item.id)">
                            <v-card-title>
                                {{ item.title }}
                            </v-card-title>
                        </v-card>
                    </div>
                </div>
            </div>
        </div>

        <div class="center">
            <div style="width: 1200px;position: relative;left: 50%;transform: translate(-50%);">
                <v-carousel height="300" show-arrows="hover" cycle hide-delimiter-background>
                    <v-carousel-item v-for="(img) in carouselImgs" :key="img" :src="img" cover></v-carousel-item>
                </v-carousel>
            </div>

            <div class="typeContainer">
                <div v-for="typeTitle in typesArray" :key="typeTitle">
                    <div class="text-h4" style="margin-top: 20px">
                        {{ typeTitle }}
                    </div>
                    <div class="typeCardContainer">
                        <culturalTypeCard v-for="(item) in types.filter(obj => { return obj.type == typeTitle })"
                            :key="item.id" :item="item" style="margin: 20px;">
                        </culturalTypeCard>
                    </div>

                </div>

            </div>
        </div>
    </div>

</template>
<script setup lang="ts">
import { getCulturalTypeList, listCulturalPost, searchCulturalPost } from '@/api/api/culturalApi.ts'
import { CulturalType, CulturalPost } from '@/api/type/culturalType.ts'
import config from '@/config.ts'
import { onMounted, ref } from 'vue';
import PostCardLite from '../../components/postCard-lite.vue';
const types = ref<CulturalType[]>([])
const culturalPosts = ref<CulturalPost[]>([])
const carouselImgs = ref<string[]>([])
const getCulturalPostsForm = ref({
    page: 1,
    limit: 10,
    data: ''
})
const currentTypeIndex = ref(0)
const loaded = ref(true)
const searchInput = ref('')
const typesArray = ref<string[]>([])
const searchResult = ref<CulturalPost[]>([])
onMounted(() => {
    carouselImgs.value = config.cultural.carouselImg
})
const getCulturalTypeListFunc = function () {
    getCulturalTypeList().then((res: any) => {
        if (res.code == 200) {
            const typesSet = new Set<string>();
            types.value = res.data
            types.value.forEach(obj => {
                typesSet.add(obj.type);
            })
            typesArray.value = Array.from(typesSet)
        }
    })
}
const handleInputChange = function () {
    searchCulturalPostFunc()
}

const searchCulturalPostFunc = function () {
    searchCulturalPost({ title: searchInput.value }).then((res: any) => {
        if (res.code == 200) {
            searchResult.value = res.data
        }
    })
}

const getCulturalPostListFunc = function () {
    listCulturalPost(getCulturalPostsForm.value).then((res: any) => {
        if (res.code == 200) {
            culturalPosts.value = culturalPosts.value.concat(res.data)
            getCulturalPostsForm.value.page++
            if (res.data.length == getCulturalPostsForm.value.limit) loaded.value = false
        }
    })
}
getCulturalTypeListFunc()
getCulturalPostListFunc()
</script>
<style scoped>
@import url('@/assets/style/cultural.css');
</style>