<!--
 * @Author: Dhx
 * @Date: 2024-04-26 16:22:48
 * @Description: 
 * @FilePath: \CareerDevelopment\src\pages\index.vue
-->
<template>
    <v-dialog style="border-radius: 10px;" max-width="500" v-model="loginDialog">
            <v-card>

                <div class="userLogin">
                    <v-tabs bg-color="white" color="rgba(0,220,171)" slider-color="transparent" fixed-tabs
                        v-model="tab1">
                        <v-tab :key="0" :value="0" style="font-size: 20px;">
                            登录
                        </v-tab>
                        <v-tab :key="1" :value="1" style="font-size: 20px;">
                            注册
                        </v-tab>
                    </v-tabs>
                    <v-window v-model="tab1">
                        <v-window-item :key="0" :value="0">
                            <v-sheet class="mx-auto" width="300">
                                <v-form fast-fail @submit.prevent>
                                    <v-text-field v-model="loginForm.username" label="用户名"
                                        variant="outlined"></v-text-field>

                                    <v-text-field v-model="loginForm.password" label="密码"
                                        variant="outlined"></v-text-field>

                                    <div class="btn" @click="loginFunc"
                                        style="width: 100%;text-align: center;height: 50px;margin-top: 20px;line-height: 50px;font-size: 20px;">
                                        登录</div>
                                </v-form>
                            </v-sheet>
                        </v-window-item>
                        <v-window-item :key="1" :value="1">
                            <v-sheet class="mx-auto" width="300">
                                <v-form fast-fail @submit.prevent>
                                    <v-text-field v-model="registerForm.username" label="用户名"
                                        variant="outlined"></v-text-field>

                                    <v-text-field v-model="registerForm.password" label="密码"
                                        variant="outlined"></v-text-field>

                                    <div class="btn" @click="registerFunc"
                                        style="width: 100%;text-align: center;height: 50px;margin-top: 20px;line-height: 50px;font-size: 20px;">
                                        注册</div>
                                </v-form>
                            </v-sheet>
                        </v-window-item>
                    </v-window>
                </div>

            </v-card>
        </v-dialog>
    <div class="picContainer">
        <div class="center">
            <div class="logo">
                <img :src="'/favicon.ico'">
            </div>
            <div class="title">
                智慧社区青少年文化教育服务系统
            </div>
            <div class="login">
                <div>
                    <v-btn v-if="!userStore.getUser().id" variant="flat" color="blue-darken-4" @click="loginDialog=true">立即登录</v-btn>
                    <v-btn v-else variant="flat" color="blue-darken-4" @click="$router.push('/sys')">进入系统</v-btn>
                </div>
                
            </div>
        </div>
    </div>
    <div class="contentContainer">
        <v-card variant="outlined" v-for="(item,index) in homepageConfig.items" max-width="210" :key="index" style="padding: 10px;border: rgb(212,212,212) 1px solid;">
            <div style="position: relative;height: 160px;width:160px;border-radius: 80px;background-size: cover;background-position: center center;left: 50%;transform: translate(-50%);" :style="{backgroundImage:`url(${item.img})`}">

            </div>
            <div style="text-align: center;font-size: 18px;margin-top: 20px;">
                {{ item.title }}
            </div>
            <div style="font-size: 16px;margin-top: 10px;">
                {{ item.text }}
            </div>
        </v-card>
    </div>
    <v-snackbar v-model="message.model" :color="message.color" :timeout="message.timeout">
        {{ message.text }}
    </v-snackbar>
</template>
<script lang="ts" setup>
import {useUserStore} from "@/stores/user.ts"
import { login, register } from '@/api/api/userApi.ts'
import config from "@/config.ts"
import { useRouter } from 'vue-router';
import { ref } from "vue";
const router = useRouter()
const userStore = useUserStore()
const homepageConfig = ref(config.homepage)
const loginDialog = ref(false)
const tab1 = ref(0)
const message = ref({
    model: false,
    timeout: 2000,
    text: '',
    color: '',
    success: (text) => { message.value.text = text; message.value.color = 'rgba(76,175,80)'; message.value.model = true },
    warning: (text) => { message.value.text = text; message.value.color = 'rgba(245,124,0)'; message.value.model = true },
    error: (text) => { message.value.text = text; message.value.color = 'rgba(211,47,47)'; message.value.model = true }
})
const loginForm = ref<{
    username: string;
    password: string;
}>({
    username: '',
    password: ''
})
const registerForm = ref<{
    username: string;
    password: string;
}>({
    username: '',
    password: ''
})
const loginFunc = function () {
    login(loginForm.value).then((res: any) => {
        if (res.code == 200) {
            message.value.success('登录成功')
            userStore.setUser(res.data)
            router.push('/sys/posts')
            // router.go(0)
        } else {
            message.value.error(res.msg)
        }
    })
}
const registerFunc = function () {
    register(registerForm.value).then((res: any) => {
        if (res.code == 200) {
            message.value.success('注册成功')
            router.go(0)
        } else {
            message.value.error(res.msg)
        }
    })
}
</script>
<style scoped>
.picContainer{
    position: relative;
    width: 100%;
    height: 500px;
    background-image: url('/school.png');
    background-size:cover;
    background-position:center center;
}
.center{
    position: absolute;
    height: 100%;
    width: 400px;
    left: 50%;
    background-color: rgba(255,255,255,0.9);
    transform: translate(-50%);
}
.title {
    height: 100px;
    line-height: 100px;
    font-size: 24px;
    font-family: '黑体';
    text-align: center;
}
.logo{
    position: relative;
    height: 200px;
    width: 100%;
}
.logo img{
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.login{
    position: relative;
    height: 150px;
    width: 100%;
}
.login div{ 
    position: relative;
    left: 50%;
    top: 50%;
    text-align: center;
    transform: translate(-50%,-50%);
}
.contentContainer{
    margin-top: 50px;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: nowrap;
}
.userLogin {
    min-height: 250px;
}
.btn {
    position: relative;
    top: 50%;
    transform: translate(0, -50%);
    height: 36px;
    padding: 0 14px;
    line-height: 36px;
    font-size: 14px;
    color: white;
    cursor: pointer;
    border-radius: 8px;
    background-image: linear-gradient(to right, rgba(0, 220, 188), rgba(0, 220, 153));
}

.btn:hover {
    background-image: linear-gradient(to right, rgba(0, 197, 164), rgba(0, 197, 137));
}
</style>