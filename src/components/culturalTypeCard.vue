<template>
    <v-card class="mx-auto" min-width="344" @click="$router.push('/culturalPosts?id='+props.item.id)">
        <v-img height="200px" :src="props.item.img" cover></v-img>

        <v-card-title style="font-weight: 700;">
            {{ props.item.name }}
        </v-card-title>
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