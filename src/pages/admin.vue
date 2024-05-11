<!--
 * @Author: Dhx
 * @Date: 2024-04-29 13:53:12
 * @Description: 
 * @FilePath: \CareerDevelopment\src\pages\admin.vue
-->
<template>
    <v-layout style="height: 100%;">
      <v-navigation-drawer
        theme="dark"
        permanent
      >
        <v-list nav>
          <v-list-item prepend-icon="mdi-home" title="主页" value="home" @click="$router.push('/sys')"></v-list-item>
          <v-list-item prepend-icon="mdi-account" title="用户" value="user" @click="$router.push('/admin/user')"></v-list-item>
          <v-list-item prepend-icon="mdi-widgets" title="知识类型" value="types" @click="$router.push('/admin/type')"></v-list-item>
          <v-list-item prepend-icon="mdi-message-text" title="文化知识" value="posts" @click="$router.push('/admin/post')"></v-list-item>
          <v-list-item prepend-icon="mdi-domain" title="职业" value="career" @click="$router.push('/admin/career')"></v-list-item>
          <v-list-item prepend-icon="mdi-info" title="心理状态" value="psychological" @click="$router.push('/admin/psychological')"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 100%">
      <RouterView></RouterView>
      </v-main>
    </v-layout>
</template>
<script setup lang="ts">
import { RouterView,useRouter } from 'vue-router';
import {useUserStore} from '@/stores/user.ts'
import { onMounted } from 'vue';
const userStore = useUserStore()
const router = useRouter()
onMounted(()=>{
  if(userStore.getUser().isAdmin==0){
    router.push('/')
  }
})
</script>
<style scoped></style>