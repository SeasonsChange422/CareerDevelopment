<!--
 * @Author: Dhx
 * @Date: 2024-05-08 16:28:12
 * @Description: 
 * @FilePath: \CareerDevelopment\src\components\culturalPostCard.vue
-->
<template>
    <v-card style="width: 20%;height: 250px;" hover @click="$router.push('/sys/culturalPost?id='+props.culturalPost.id)">
        <v-img :src="props.culturalPost.img" cover></v-img>

        <v-card-title>
            {{ props.culturalPost.title }}
        </v-card-title>

        <v-card-subtitle>
            {{ type.name }}
        </v-card-subtitle>
    </v-card>
</template>
<script setup lang="ts">
import { getCulturalTypeById } from '@/api/api/culturalApi.ts'
import { CulturalType, CulturalPost } from '@/api/type/culturalPostType.ts'
import { onMounted, ref } from 'vue';
const props = defineProps<{
    culturalPost: CulturalPost
}>()
const type = ref<CulturalType>({
    id: '',
    name: '',
})
onMounted(() => {
    getCulturalTypeByIdFunc()
})
const getCulturalTypeByIdFunc = function () {
    getCulturalTypeById({ id: props.culturalPost.typeId }).then((res: any) => {
        if (res.code == 200) {
            type.value = res.data
        }
    })
}
</script>
<style scoped></style>