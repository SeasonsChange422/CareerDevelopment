<!--
 * @Author: Dhx
 * @Date: 2024-04-29 00:52:37
 * @Description: 
 * @FilePath: \CareerDevelopment\src\pages\index\posts.vue
-->
<template>
    <v-infinite-scroll :item="posts" :onLoad="load">
        <div class="center">
            <AddPost></AddPost>
            <div class="postList">
                <PostCardLite v-for="(post, index) in posts" :key="index" :cultural-post="post">
                </PostCardLite>
            </div>

        </div>
    </v-infinite-scroll>
</template>
<script setup lang="ts">
import { getPostList } from '@/api/api/postApi.ts'
import { PostListForm, PostVo } from '@/api/type/postType.ts'
import { ref } from 'vue';
const getPostListForm = ref<PostListForm>({
    page: 1,
    limit: 10,
})

const posts = ref<PostVo[]>([])
const getPostListFunc = function () {
    getPostList(getPostListForm.value).then((res: any) => {
        if (res.code == 200) {
            posts.value = posts.value.concat(res.data)
            getPostListForm.value.page++
            if(res.data.length==getPostListForm.value.limit) loaded.value = false // 后面还有数据
        }
    })
}
const loaded = ref(true)
const load = async function ({ done }) {
    if(loaded.value){
        done('ok')
        return
    }
    loaded.value = true
    getPostListFunc()
    done('ok')
}
getPostListFunc()
</script>
<style scoped>
@import url('@/assets/style/posts.css');
</style>