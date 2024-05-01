<!--
 * @Author: Dhx
 * @Date: 2024-04-29 01:26:01
 * @Description: 
 * @FilePath: \CareerDevelopment\src\components\postCard-lite.vue
-->
<template>
    <v-card class="mx-auto" style="width: 100%;margin-top: 30px;min-height: 150px;max-height: 500px;" hover @click="$router.push((props.culturalPost.uid?'/post?id=':'/culturalPost?id=')+props.culturalPost.id)">
        <v-list-item
            :title="user.username"
            :subtitle="props.culturalPost.createAt"
            :prepend-avatar="user.img"
            v-if="props.culturalPost.uid"></v-list-item>
        <v-card-item>
            <v-card-title style="font-weight: 700;">
                {{ props.culturalPost.title }}
            </v-card-title>
        </v-card-item>

        <v-card-text>
            <span v-html="props.culturalPost.content?props.culturalPost.content:props.culturalPost.text"></span>
        </v-card-text>
    </v-card>
</template>
<script setup lang="ts">
import { useUserStore } from '@/stores/user.ts'
import { CulturalPost } from '@/api/type/culturalType.ts'
import {UserInfo} from '@/api/type/userType.ts'
import { onMounted, ref } from 'vue';
const userStore = useUserStore()
const props = defineProps<{
    culturalPost: CulturalPost
}>()
const user = ref<UserInfo>({

})
onMounted(()=>{
    if(props.culturalPost.uid){
    userStore.getUserByIdFunc(props.culturalPost.uid).then(res=>{
        user.value = res
    })
}
})
</script>
<style scoped></style>