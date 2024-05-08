<!--
 * @Author: Dhx
 * @Date: 2024-05-08 18:20:13
 * @Description: 
 * @FilePath: \CareerDevelopment\src\components\messageComponent.vue
-->
<template>
    <div class="message-box" :style="{flexDirection:props.chatMessage.userId===userStore.getUser().id?'row-reverse':'row'}">
        <div clas="message-box__left">
            <v-avatar :image="userStore.getUser().img" v-if="props.chatMessage.userId===userStore.getUser().id" >
            </v-avatar>
            <v-avatar :image="chatUser?.img" size="30" v-else></v-avatar>
            
        </div>
        <div clas="message-box__right">
            <!-- <div class="message-box__right__time">
                {{  }}
            </div> -->
            <div class="message-box__right__content">
                <div class="content" :style="{backgroundColor:props.chatMessage.userId===userStore.getUser().id?'rgba(174,221,255)':'rgba(240,240,245)'}" >
                    <div v-text="props.chatMessage.message"></div>
                </div>
            </div>
        </div>

    </div>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/stores/user.ts'
import {Message} from '@/api/type/chatType.ts'
import {UserInfo} from '@/api/type/userType.ts'
import { onMounted, ref } from 'vue';
const userStore = useUserStore()

const props = defineProps<{
    chatMessage: Message
}>()
const chatUser = ref<UserInfo>({
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
const getChatUserInfo = function() {
    userStore.getUserByIdFunc(props.chatMessage.toUserId==userStore.getUser().id?props.chatMessage.userId:props.chatMessage.toUserId).then((res:any)=>{
        chatUser.value = res
    })
    
}
onMounted(()=>{
    getChatUserInfo()
})
</script>
<style scoped>
.message-box{
    width: 100%;
    padding: 20px;
    display: flex;
    min-height: 100%;

}

.message-box__left{
    width: 30px;
}

.message-box__right{
    width: calc(100% - 40px);
}

.message-box__right__time{
    width: 100%;
    height: 20px;
    font-size: 12px;
    font-weight: 100;
    line-height: 10px;
    padding: 5px;
}

.message-box__right__content{
    width: 100%;
}

.content {
    margin: 0 10px;
    padding: 10px;
    border-radius: 10px;
}
</style>