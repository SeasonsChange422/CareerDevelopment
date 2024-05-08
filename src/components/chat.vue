<template>
    <v-card style="height: 900px;width: 1000px;position: relative;left: 50%;transform: translate(-50%);">
        <div style="position:relative;height:  50px;width: 100%;background-color: black;color: white;text-align: center;line-height: 50px;font-size: 18px;">
            <span>{{ chatUser.username }}</span>
        </div>
        <div style="height: calc(100% - 150px);overflow-y: scroll;">
            <div v-for="message in messages" :key="message.id" style="height: 80px;">
                <messageComponent :chatMessage="message"></messageComponent>
            </div>

        </div>
        <div style="position: absolute;width:100%;bottom: 0;height:100px;background-color: white;z-index: 10;box-shadow: grey 0 -1px 5px ;">
            <div style="position:relative;width: 80%;left: 50%;transform: translate(-50%);">
                <v-text-field style="margin-top: 10px;" v-model="addChatForm.message" append-icon="mdi-send" clear-icon="mdi-close-circle"
                    label="Message" type="text" variant="outlined" clearable @click:append="sendMessage"
                    @keyup:enter="sendMessage"></v-text-field>
            </div>
        </div>
    </v-card>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Message } from '@/api/type/chatType.ts'
import { UserInfo } from '@/api/type/userType';
import { chatList, addChat } from '@/api/api/chatApi.ts'
import { useUserStore } from '@/stores/user.ts'
const props = defineProps<{
    toUserId: string
}>()
const messages = ref<Message[]>([])
const userStore = useUserStore()
const getChatListForm = ref<{
    limit: number;
    page: number;
    userId: string;
    toUserId: string;
}>({
    limit: 50,
    page: 1,
    userId: userStore.getUser().id,
    toUserId: ''
})
const addChatForm = ref<{
    userId: string;
    toUserId: string;
    message: string;
}>({
    userId: userStore.getUser().id,
    toUserId: '',
    message: '',
})
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
const disabled = ref(false)
const sendMessage = function () {
    if (disabled.value || !addChatForm.value.message) return
    disabled.value = true
    addChat(addChatForm.value).then((res: any) => {
        if (res.code == 200) {
            messages.value.push(res.data)
            addChatForm.value.message = ''
            disabled.value = false
        }
    })
}
const getChatListFunc = function () {
    chatList(getChatListForm.value).then((res: any) => {
        if (res.code == 200) {
            for (let i = 0; i < res.data.length; i++) {
                const item = res.data[i];
                const index = messages.value.findIndex(message => message.id == item.id)
                if (index === -1) {
                    messages.value.push(item)
                }
            }
            messages.value.sort((a, b) => {
                var dateA = new Date(a.createAt);
                var dateB = new Date(b.createAt);
                return dateA - dateB;
            })
            if (res.data.length == getChatListForm.value.limit) {
                getChatListForm.value.page++
                getChatListFunc()
            }
        }
    })
}
const getChatUserInfo = function() {
    userStore.getUserByIdFunc(props.toUserId).then((res:any)=>{
        chatUser.value = res
    })
    
}
onMounted(() => {
    getChatListForm.value.toUserId = props.toUserId
    addChatForm.value.toUserId = props.toUserId
    getChatListFunc()
    getChatUserInfo()
    setInterval(() => {
        getChatListFunc()
        
    }, 3000)
})
</script>
<style scoped></style>