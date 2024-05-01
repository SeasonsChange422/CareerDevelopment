<!--
 * @Author: Dhx
 * @Date: 2024-04-30 19:20:17
 * @Description: 
 * @FilePath: \CareerDevelopment\src\pages\index\culturalPost.vue
-->
<template>
    <div class="center">
        <div class="contentBox">
            <div class="text-h3">{{ post.title }}</div>
            <div v-html="post.text"></div>
        </div>
    </div>

</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { getCulturalById } from '@/api/api/culturalApi.ts'
import { CulturalPost } from '@/api/type/culturalType.ts'
import { onMounted, ref } from 'vue';
const router = useRouter()
const post = ref<CulturalPost>({

})

let culturalPostId = ''
onMounted(() => {
    culturalPostId = router.currentRoute.value.query.id as string
    getPostFunc()
})

const getPostFunc = function () {
    getCulturalById({ id: culturalPostId }).then((res: any) => {
        if (res.code == 200) {
            post.value = res.data
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