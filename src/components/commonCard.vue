<!--
 * @Author: Dhx
 * @Date: 2024-05-01 17:03:49
 * @Description: 
 * @FilePath: \CareerDevelopment\src\components\commonCard.vue
-->
<template>
    <div>
        <v-card class="mx-auto" width="250" style="margin-top: 20px;" @click="$router.push(props.path)">
            <v-img class="align-end text-white" height="250" :src="props.item.img"
                cover>
                <v-card-title>{{ props.item.name }}</v-card-title>
            </v-img>
            <!-- <v-card-text>
                <div  style="overflow: hidden;height: 50px;" v-html="props.item.description"></div>
            </v-card-text> -->
        </v-card>
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    item:{
        id:string;
        name:string;
        description:string;
        img:string;
    },
    path: string
}>()
</script>
<style scoped></style>