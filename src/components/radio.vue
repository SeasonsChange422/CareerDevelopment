<!--
 * @Author: Dhx
 * @Date: 2024-05-02 02:39:01
 * @Description: 
 * @FilePath: \CareerDevelopment\src\components\radio.vue
-->
<template>
    <div>
        <v-radio-group v-model="radios">
            <template v-slot:label>
                <div><strong>{{ props.item.question }}</strong></div>
            </template>
            <div v-if="props.type != 'career'">
                <v-radio :label="props.item.tr" @click="props.check(props.item.psychologicalId,props.item.answer == 'tr')" value="tr">

                </v-radio>
                <v-radio :label="props.item.fa" @click="props.check(props.item.psychologicalId,props.item.answer == 'fa')" value="fa">

                </v-radio>
            </div>
            <div v-else>
                <v-radio :label="props.item.a" @click="props.check(props.item.careerId,props.item.answer == 'a')" value="a">

                </v-radio>
                <v-radio :label="props.item.b" @click="props.check(props.item.careerId,props.item.answer == 'b')" value="b">

                </v-radio>
                <v-radio :label="props.item.c" @click="props.check(props.item.careerId,props.item.answer == 'c')" value="c">

                </v-radio>
                <v-radio :label="props.item.d" @click="props.check(props.item.careerId,props.item.answer == 'd')" value="d">

                </v-radio>
            </div>

        </v-radio-group>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const props = defineProps<{
    item: {
        id: string;
        careerId: string;
        psychologicalId:string;
        question: string;
        answer: string;
        a: string;
        b: string;
        c: string;
        d: string;
        tr: string;
        fa: string;
    },
    type: string,
    check: (id:string,tr:boolean) => void
}>()
const radios = ref('')
onMounted(() => {
})
</script>
<style scoped></style>