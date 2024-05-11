<!--
 * @Author: Dhx
 * @Date: 2024-05-11 13:35:58
 * @Description: 
 * @FilePath: \CareerDevelopment\src\components\chatWindow.vue
-->
<template>
    <div style="height: 900px;width:1185px;display: flex;position: relative;left: 50%;transform: translate(-50%);border-radius: 10px;">
        <div style="height: 900px;width: 215px;background-color: white;">
            <div style="position:relative;height:  50px;width: 100%;background-color: black;color: white;text-align: center;line-height: 50px;font-size: 18px;">
            </div>
            <div style="height: 850px;width: 200px;overflow-y: scroll;position: relative;">
                <v-list lines="two">
                    <v-list-item @click="currentIndex=index" v-for="(user,index) in friends" :key="user.id" :title="user.username" class="userListItem" style="border-bottom: rgba(0,0,0,0.1) 1px solid;"
                        :prepend-avatar="user.img">
                    </v-list-item>
                </v-list>
            </div>
        </div>
        <div style="height: 900px;width: 1000px;position: relative;left: -15px">
            <chat :key="currentIndex" v-if="friends.length!=0" :toUserId="friends[currentIndex].id"></chat>
        </div>
    </div>
</template>
<script setup lang="ts">
import { getFriends } from '@/api/api/userApi.ts'
import { onMounted, ref } from 'vue';
import { UserInfo } from '@/api/type/userType.ts'
const friends = ref<UserInfo[]>([])
const currentIndex = ref(0)
const getFriendsFunc = function () {
    getFriends().then((res: any) => {
        friends.value = res.data
    })
}
onMounted(() => {
    getFriendsFunc()
})
</script>
<style scoped>
.userListItem:hover{
    background-color: rgba(0,0,0,0.1);
    cursor: pointer;
}
</style>