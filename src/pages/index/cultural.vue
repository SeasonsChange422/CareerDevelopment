<!--
 * @Author: Dhx
 * @Date: 2024-04-29 00:53:04
 * @Description: 
 * @FilePath: \CareerDevelopment\src\pages\index\cultural.vue
-->
<template>
    <div class="picContainer">
        <div class="title">
            智慧社区青少年文化教育服务系统
        </div>
        <div class="searchContainer">
            <div class="search-center">
                <v-text-field append-inner-icon="mdi-magnify" v-model="searchInput" density="compact" label="搜索"
                    variant="solo" hide-details single-line @input="handleInputChange"></v-text-field>
            </div>
        </div>
    </div>

    <div class="center">
        <div class="typeContainer">
            <culturalTypeCard v-for="(item) in displayTypes" :key="item.id" :item="item" style="margin-top: 20px;">
            </culturalTypeCard>
        </div>
    </div>
</template>
<script setup lang="ts">
import { getCulturalTypeList, listCulturalPost } from '@/api/api/culturalApi.ts'
import { CulturalType, CulturalPost } from '@/api/type/culturalType.ts'
import { ref } from 'vue';
import PostCardLite from '../../components/postCard-lite.vue';
const types = ref<CulturalType[]>([])
const culturalPosts = ref<CulturalPost[]>([])
const displayTypes = ref<CulturalPost[]>([])
const getCulturalPostsForm = ref({
    page: 1,
    limit: 10,
    data: ''
})
const currentTypeIndex = ref(0)
const loaded = ref(true)
const searchInput = ref('')
const load = async function ({ done }) {
    if (loaded.value) {
        done('ok')
        return
    }
    loaded.value = true
    getCulturalPostListFunc()
    done('ok')
}
const getCulturalTypeListFunc = function () {
    getCulturalTypeList().then((res: any) => {
        if (res.code == 200) {
            types.value = res.data
            displayTypes.value = res.data
        }
    })
}
const handleInputChange = function () {
    displayTypes.value = types.value.filter((item) => {
        return item.name.includes(searchInput.value)
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