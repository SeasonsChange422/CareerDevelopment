<template>
    <div class="container">
        <!-- <v-breadcrumbs :items="items" style="margin-left:15%;">
            <template v-slot:title="{ item }">
                {{ item.title.toUpperCase() }}
            </template>
</v-breadcrumbs> -->
        <div class="center">
            <div class="row">
                <p class="label text-h6" style="display: inline-block;">头像：</p>
                <div style="width: 300px;">
                    <v-img v-if="!isEdit" :src="user.img ? user.img : '/img/default.jfif'" width="200" height="200"
                        style="display: inline-block;"></v-img>
                    <v-file-input v-else :rules="rules" v-model="avatar" accept="image/png, image/jpeg, image/bmp"
                        label="Avatar" placeholder="Pick an avatar" prepend-icon="mdi-camera"
                        @change="upload"></v-file-input>
                </div>
            </div>
            <div class="row">
                <p class="label text-h6">生日：</p>
                <p class="label text-h6" v-if="!isEdit">{{ parseDate(new Date(user.birth)) }}</p>
                <v-date-picker v-else v-model="updateInfo.birth"></v-date-picker>
            </div>
            <div class="row">
                <p class="label text-h6">性别：</p>
                <p class="label text-h6" v-if="!isEdit">{{ user.sex }}</p>
                <v-select v-model="updateInfo.sex" v-else :items="sexOptions" item-title="label" item-value="value"
                    label="Select" persistent-hint single-line></v-select>
            </div>
            <div class="row">
                <p class="label text-h6">教育经历：</p>
                <p class="label text-h6" v-if="!isEdit">{{ user.education }}</p>
                <v-select v-model="updateInfo.education" v-else :items="educationOptions" item-title="label"
                    item-value="value" label="Select" persistent-hint single-line></v-select>
            </div>
            <div class="row">
                <p class="label text-h6">简介：</p>
                <p class="label text-h6" v-if="!isEdit">{{ user.introduction }}</p>
                <v-text-field label="introduction" v-else variant="underlined"
                    v-model="updateInfo.introduction"></v-text-field>
            </div>
            <div class="row">
                <p class="label text-h6">用户名：</p>
                <p class="label text-h6" v-if="!isEdit">{{ user.username }}</p>
                <v-text-field label="username" v-else variant="underlined" v-model="updateInfo.username"></v-text-field>
            </div>
            <div class="row" v-if="uid == userStore.getUser().id">
                <p class="label text-h6">密码：</p>
                <p class="label text-h6" v-if="!isEdit">{{ user.password }}</p>
                <v-text-field label="password" v-else variant="underlined" v-model="updateInfo.password"></v-text-field>
            </div>
            <div class="row" style="justify-content: end;">
                
                <v-btn class="btn" @click="edit" v-if="uid == userStore.getUser().id&&!isEdit">
                    编辑
                </v-btn>
                <v-btn class="btn" @click="chatDialog = true" v-else>
                    私信
                </v-btn>
                <v-btn class="btn" v-if="isEdit" @click="isEdit = false">
                    取消
                </v-btn>
                <v-btn class="btn" v-if="isEdit" color="blue" @click="updateUserInfoFunc">
                    保存
                </v-btn>
            </div>
        </div>
    </div>
    <v-snackbar v-model="message.model" :color="message.color" :timeout="message.timeout">
        {{ message.text }}
    </v-snackbar>
    <v-dialog v-model="chatDialog" style="width: 1000px;">
        <chat :toUserId="uid" :key="uid"></chat>
    </v-dialog>
</template>
<script lang="ts" setup>
import { getUserInfoById, updateUserInfo, uploadAvatar } from '@/api/api/userApi.ts';
import { UserInfo } from '@/api/type/userType';
import { useUserStore } from '@/stores/user.ts'
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'
const router = useRouter()
const userStore = useUserStore()
const tab = ref(0)
const items = ref([
    {
        title: '首页',
        disabled: false,
        href: '/',
    },
    {
        title: '个人主页',
        disabled: true,
        href: '',
    },
])
const message = ref({
    model: false,
    timeout: 2000,
    text: '',
    color: '',
    success: (text) => { message.value.text = text; message.value.color = 'rgba(76,175,80)'; message.value.model = true },
    warning: (text) => { message.value.text = text; message.value.color = 'rgba(245,124,0)'; message.value.model = true },
    error: (text) => { message.value.text = text; message.value.color = 'rgba(211,47,47)'; message.value.model = true }
})
const uid = ref('')
const user = ref<UserInfo>({
    id: '',
    img: '',
    birth: new Date(),
    sex: '',
    introduction: '',
    username: '',
    password: '',
    education: '',
    isAdmin: 0
})
const updateInfo = ref<UserInfo>({
    id: '',
    img: '',
    birth: new Date(),
    sex: '',
    introduction: '',
    username: '',
    password: '',
    education: '',
    isAdmin: 0
})
const isEdit = ref(false)
const sexOptions = ref([
    { label: '男', value: '男' },
    { label: '女', value: '女' },
])
const educationOptions = ref([
    { label: '小学', value: '小学' },
    { label: '初中', value: '初中' },
    { label: '高中', value: '高中' },
    { label: '中专/中技', value: '中专/中技' },
    { label: '大专', value: '大专' },
    { label: '本科', value: '本科' },
])
const loadding = ref(true)
const chatDialog = ref(false)
const rules = ref([
    value => {
        return !value || !value.length || value[0].size < 2000000 || '图片必须小于2 MB!'
    },
])
const avatar = ref<File[]>([])
const updateUserInfoFunc = function () {
    // if(this.loadding||JSON.stringify(this.user)==JSON.stringify(this.updateInfo)) return
    loadding.value = true
    let param = JSON.parse(JSON.stringify(updateInfo.value))
    param.birth = parseDate(new Date(param.birth))
    updateUserInfo(param).then((res: any) => {
        if (res.code == 200) {
            message.value.success("修改成功")
            loadding.value = false
            isEdit.value = false
            setTimeout(() => {
                getUserInfoFunc()
            }, 1000);
        } else {
            message.value.success(res.msg)
        }
    })
}
const parseDate = function (value) {
    const year = value.getFullYear()
    // @ts-ignore
    const month = String(value.getMonth() + 1).padStart(2, '0')
    const day = String(value.getDate()).padStart(2, '0')
    const hours = String(value.getHours()).padStart(2, '0')
    const minutes = String(value.getMinutes()).padStart(2, '0')
    const seconds = String(value.getSeconds()).padStart(2, '0')
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
const edit = function () {
    isEdit.value = true;
    updateInfo.value = JSON.parse(JSON.stringify(user.value))
    updateInfo.value.birth = new Date(user.value.birth)
}
const upload = function () {
    uploadAvatar(avatar.value[0]).then((res: any) => {

        if (res.code == 200) {
            message.value.success("上传成功")
            updateInfo.value.img = res.data
        } else {
            message.value.error(res.msg)
        }
    })
}
onMounted(() => {
    setTimeout(() => {
        uid.value = router.currentRoute.value.query.id as string
        getUserInfoFunc()
    }, 500);

})
const getUserInfoFunc = function () {
    userStore.getUserByIdFunc(uid.value).then((res: any) => {
            user.value = res
            user.value.sex = user.value.sex == '1' ? '男' : '女'
    })
}
</script>
<style scoped>
.container {
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    background-image: url('/img/image.png');
    background-position: center center;
    background-repeat: repeat;
    /* background-size: 100% 100%; */
}

.center {
    min-height: 70vh;
    width: 70%;
    background-color: white;
    margin: auto;
    /* display: flex; */
    padding: 20px;
}

.row {
    display: flex;
    align-items: flex-start;
    margin: 20px 0;
}

.label {
    font-size: 16px;
    font-weight: 100;
    min-width: 100px;
}

.btn {
    margin: 0 10px;
}
</style>
