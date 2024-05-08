<template>
    <v-infinite-scroll :item="comments" :onLoad="load">
        <div class="center">
            <div class="userBox">
                <v-card-item>
                    <v-list-item @click="$router.push('/sys/profile?id='+user.id)" hover :title="user.username" :subtitle="post.createAt"
                        :prepend-avatar="user.img"></v-list-item>
                </v-card-item>
            </div>
            <div class="contentBox">
                <div class="text-h3">{{ post.title }}</div>
                <div v-html="post.content"></div>
            </div>
            <div class="commentBox">
                
                <commentsComponent :commentList="comments" :key="comments.length"></commentsComponent>
            </div>

        </div>
    </v-infinite-scroll>

</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { PostVo } from '@/api/type/postType.ts'
import { useUserStore } from '@/stores/user.ts'
import { getPostById, getCommentList,commentAdd } from '@/api/api/postApi.ts'
import { UserInfo } from '@/api/type/userType.ts'
import { onMounted, ref } from 'vue';
import { CommentVo,CommentForm } from '@/api/post/postType'
const router = useRouter()
const userStore = useUserStore()
const post = ref<PostVo>({

})
const user = ref<UserInfo>({

})
const getCommentsForm = ref({
    page: 1,
    limit: 10,
    data: ''
})
const comments = ref<CommentVo[]>([])
let postId = ''
onMounted(() => {
    postId = router.currentRoute.value.query.id as string
    getCommentsForm.value.data = postId
    getPostFunc()
    getCommentListFunc()
})
const loaded = ref(true)
const load = async function ({ done }) {
    if(loaded.value){
        done('ok')
        return
    }
    loaded.value = true
    getCommentListFunc()
    done('ok')
}
const getPostFunc = function () {
    getPostById({ id: postId }).then((res: any) => {
        if (res.code == 200) {
            post.value = res.data
            userStore.getUserByIdFunc(post.value.uid).then(res => {
                user.value = res
            })
        }
    })
}
const getCommentListFunc = function () {
    getCommentList(getCommentsForm.value).then((res: any) => {
        if (res.code == 200) {
            comments.value = comments.value.concat(res.data)
            getCommentsForm.value.page++
            if (res.data.length == getCommentsForm.value.limit) loaded.value = false
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

.userBox {
    position: relative;
    width: 100%;
    background-color: white;
    border-radius: 20px;
    padding: 20px;
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

.commentBox {
    position: relative;
    width: 100%;
    min-height: 200px;
    background-color: white;
    border-radius: 20px;
    padding: 20px;
    margin-top: 40px;
}
</style>