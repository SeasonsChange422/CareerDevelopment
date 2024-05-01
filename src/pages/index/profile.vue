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
                <p class="label text-h6" v-if="!isEdit">{{ user.sex == '1' ? '男' : user.sex == '0' ? '女' : '' }}</p>
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
            <div class="row">
                <p class="label text-h6">密码：</p>
                <p class="label text-h6" v-if="!isEdit">{{ user.password }}</p>
                <v-text-field label="password" v-else variant="underlined" v-model="updateInfo.password"></v-text-field>
            </div>
            <div class="row" style="justify-content: end;">
                <v-btn class="btn" @click="edit" v-if="!isEdit">
                    编辑
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
</template>
<script lang="ts">
// @ts-
import { getUserInfo, updateUserInfo, uploadAvatar } from '../../api/api/userApi';
import { userInfo } from '@/api/type/userType';
import { useUserStore } from '@/stores/user.ts'
const userStore = useUserStore()

export default {
    name: 'flowers',
    data() {
        return {
            tab: 0,
            items: [
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
            ],
            message: {
                text: '',
                type: 'success',
                show: false
            },
            user: {
                id: '',
                img: '',
                birth: new Date(),
                sex: '',
                introduction: '',
                username: '',
                password: '',
                education: '',
                isAdmin: 0
            } as userInfo,
            updateInfo: {
                id: '',
                img: '',
                birth: new Date(),
                sex: '',
                introduction: '',
                username: '',
                password: '',
                education: '',
                isAdmin: 0
            } as userInfo,
            isEdit: false,
            sexOptions: [
                { label: '男', value: '男' },
                { label: '女', value: '女' },
            ],
            educationOptions: [
                { label: '小学', value: '小学' },
                { label: '初中', value: '初中' },
                { label: '高中', value: '高中' },
                { label: '中专/中技', value: '中专/中技' },
                { label: '大专', value: '大专' },
                { label: '本科', value: '本科' },
            ],
            loadding: true,
            rules: [
                value => {
                    return !value || !value.length || value[0].size < 2000000 || '头像必须小于2 MB!'
                },
            ],
            avatar: [] as File[]
        }
    },
    methods: {
        updateUserInfoFunc() {
            // if(this.loadding||JSON.stringify(this.user)==JSON.stringify(this.updateInfo)) return
            this.loadding = true
            let param = JSON.parse(JSON.stringify(this.updateInfo))
            param.birth = this.parseDate(new Date(param.birth))
            updateUserInfo(param).then((res: any) => {
                if (res.code == 200) {
                    this.message.type = 'success'
                    this.message.text = '修改成功'
                    this.message.show = true
                    this.loadding = false
                    this.isEdit = false
                    setTimeout(() => {
                        this.message.show = false
                        this.$router.go(0)
                    }, 2000);
                } else {
                    this.message.type = 'warning'
                    this.message.text = res.msg
                    this.message.show = true
                    setTimeout(() => {
                        this.message.show = false
                    }, 2000);
                }
            })
        },
        parseDate(value) {
            const year = value.getFullYear()
            // @ts-ignore
            const month = String(value.getMonth() + 1).padStart(2, '0')
            const day = String(value.getDate()).padStart(2, '0')
            const hours = String(value.getHours()).padStart(2, '0')
            const minutes = String(value.getMinutes()).padStart(2, '0')
            const seconds = String(value.getSeconds()).padStart(2, '0')
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
        },
        edit() {
            this.isEdit = true;
            this.updateInfo = JSON.parse(JSON.stringify(this.user))
            this.updateInfo.birth = new Date(this.user.birth)
        },
        upload() {
            uploadAvatar(this.avatar[0]).then((res: any) => {

                if (res.code == 200) {
                    this.message.type = 'success'
                    this.message.text = '上传成功'
                    this.message.show = true
                    this.updateInfo.img = res.data
                    setTimeout(() => {
                        this.message.show = false
                    }, 2000);
                } else {
                    this.message.type = 'waring'
                    this.message.text = res.msg
                    this.message.show = true
                    setTimeout(() => {
                        this.message.show = false
                    }, 2000);
                }
            })
        },
        getUserInfoFunc() {
            getUserInfo().then((res: any) => {
                if (res.code == 200) {
                    userStore.setUser(res.data)
                    this.user = res.data
                }
            })
        }
    },
    mounted() {
        if (!localStorage.getItem('uid')) {
            this.$router.push('/homepage')
            return
        }
        this.getUserInfoFunc()

    },
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
