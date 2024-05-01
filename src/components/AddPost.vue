<!--
 * @Author: Dhx
 * @Date: 2024-04-29 02:02:01
 * @Description: 
 * @FilePath: \CareerDevelopment\src\components\AddPost.vue
-->
<template>
    <div class="addPostContainer">
        <!-- <div class="left">
            <div class="text-h6" style="margin: 15px;">封面</div>
            <div class="uploadImage">+</div>
        </div> -->
        <div class="right">
            <div class="top">
                <v-text-field placeholder="标题" variant="outlined" v-model="addPostForm.title"></v-text-field>
            </div>
            <div class="bottom">
                <editorComponent :editorContent="''" :getContent="(html:string)=>{addPostForm.content = html}"></editorComponent>
            </div>
            <div style="display: flex;justify-content: end;">
                <v-btn variant="outlined" style="margin-top: 5px;" @click="addPostFunc">发布</v-btn>
            </div>
        </div>
    </div>
    <v-snackbar v-model="message.model" :color="message.color" :timeout="message.timeout">
        {{ message.text }}
    </v-snackbar>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import {addPost} from '@/api/api/postApi.ts'
import { useRouter } from 'vue-router';
const router = useRouter()
const message = ref({
    model:false,
    timeout:2000,
    text:'',
    color: '',
    success: (text)=>{message.value.text=text;message.value.color = 'rgba(76,175,80)';message.value.model=true},
    warning: (text)=>{message.value.text=text;message.value.color = 'rgba(245,124,0)';message.value.model=true},
    error: (text)=>{message.value.text=text;message.value.color='rgba(211,47,47)';message.value.model=true}
})
const addPostForm = ref({
    title: '',
    content: '',
})
const addPostFunc = function() {
    addPost(addPostForm.value).then((res:any)=>{
        if(res.code == 200){
            message.value.success('发表成功')
            router.go(0)
        }
    })
}
</script>
<style scoped>
@import url('@/assets/style/addPost.css');
</style>