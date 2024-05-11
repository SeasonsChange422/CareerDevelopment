<!--
 * @Author: Dhx
 * @Date: 2024-04-26 16:22:48
 * @Description: 
 * @FilePath: \CareerDevelopment\src\pages\sys.vue
-->
<template>
  <AppHeader/>
  <div class="background">
    <RouterView></RouterView>
  </div>
  <!-- <AppFooter/> -->
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import {useRouter} from 'vue-router'
const router = useRouter()
onMounted(()=>{
  if(router.currentRoute.value.path=='/')
    router.push('/posts')
})
  //
</script>
<style scoped>
@import url('/src/assets/style/IndexStyle.css');
</style>
