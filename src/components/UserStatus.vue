<template>
    <div class="login" v-if="!userStore.getUser().id">
        <div class="btn" @click="loginDialog = true">
            登录 / 注册
        </div>
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
    </div>
    <div class="user" v-else>
        <v-avatar class="avatar"
            :image="userStore.getUser().img ? userStore.getUser().img : '/default.jfif'"></v-avatar>
        <v-card class="mx-auto userBox">
            <router-link to="/profile">
                <v-btn variant="text" style="width: 100%;">
                    个人中心
                </v-btn>
            </router-link>
            <router-link to="/schedule">
                <v-btn variant="text" style="width: 100%;">
                    个人规划
                </v-btn>
            </router-link>
            <router-link to="/admin">
                <v-btn variant="text" style="width: 100%;"
                    v-if="userStore.getUser().isAdmin == '1'">
                    管理员端
                </v-btn>
            </router-link>

            <v-btn variant="text" style="width: 100%;" @click="logout">
                退出登录
            </v-btn>
        </v-card>
    </div>
    <v-snackbar v-model="message.model" :color="message.color" :timeout="message.timeout">
        {{ message.text }}
    </v-snackbar>
</template>
<script lang="ts" setup>
import { login, register } from '@/api/api/userApi.ts'
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user.ts'
import { getUserInfo } from '../api/api/userApi';
const router = useRouter()
const message = ref({
    model: false,
    timeout: 2000,
    text: '',
    color: '',
    success: (text) => { message.value.text = text; message.value.color = 'rgba(76,175,80)'; message.value.model = true },
    warning: (text) => { message.value.text = text; message.value.color = 'rgba(245,124,0)'; message.value.model = true },
    error: (text) => { message.value.text = text; message.value.color = 'rgba(211,47,47)'; message.value.model = true }
})
const loginDialog = ref(false)
const tab = ref(0)
const tab1 = ref(0)
const userStore = useUserStore()

// 登录表单
const loginForm = ref<{
    username: string;
    password: string;
}>({
    username: '',
    password: ''
})
// 注册表单
const registerForm = ref<{
    username: string;
    password: string;
}>({
    username: '',
    password: ''
})
// 登录
const loginFunc = function () {
    login(loginForm.value).then((res: any) => {
        if (res.code == 200) {
            userStore.setUser(res.data)
            // router.go(0)
        }
    })
}
// 注册
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
// 登出
const logout = function () {
    userStore.clearUser()
}
onMounted(() => {
    if (router.currentRoute.value.query.login) {
        loginDialog.value = true
    }
})
</script>
<style scoped>
@import url('/src/assets/style/UserStatus.css');
</style>