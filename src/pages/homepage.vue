<template>
    <div style="z-index: -10;position: absolute;top: -100px;left:-100px">
    <userStatus></userStatus>
    </div>
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
                    <v-btn v-if="!userSotre.getUser().id" variant="flat" color="blue-darken-4" @click="$router.push('/homepage?login=true');$router.go(0)">立即登录</v-btn>
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
</template>
<script lang="ts" setup>
import {useUserStore} from "@/stores/user.ts"
import config from "@/config.ts"
import { ref } from "vue";
const userSotre = useUserStore()
const homepageConfig = ref(config.homepage)
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
</style>