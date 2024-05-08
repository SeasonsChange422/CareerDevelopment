<!--
 * @Author: Dhx
 * @Date: 2024-05-04 14:50:08
 * @Description: 
 * @FilePath: \CareerDevelopment\src\components\culturalTypeCard.vue
-->
<template>
    <v-card style="width: 30%;" @click="$router.push('/sys/culturalPosts?id='+props.item.id)">
        <v-img :src="props.item.img" cover></v-img>
    </v-card>
</template>
<script lang="ts" setup>
import {culturalType} from '@/api/tyoe/culturalType.ts'
const props = defineProps<{
    item: culturalType
}>()
</script>
<style scoped>
</style>