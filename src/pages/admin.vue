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
          <v-list-item prepend-icon="mdi-account" title="用户" value="inbox" @click="$router.push('/admin/user')"></v-list-item>
          <v-list-item prepend-icon="mdi-message-text" title="帖子" value="supervisors" @click="$router.push('/admin/post')"></v-list-item>
          <v-list-item prepend-icon="mdi-domain" title="职业" value="clockin" @click="$router.push('/admin/career')"></v-list-item>
          <v-list-item prepend-icon="mdi-widgets" title="心理状态" value="clockin" @click="$router.push('/admin/psychological')"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 100%">
      <RouterView></RouterView>
      </v-main>
    </v-layout>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router';

</script>
<style scoped></style>