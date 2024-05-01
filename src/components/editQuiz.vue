<template>
    <v-card class="container">
        <div v-for="(careerQuiz, index) in careerQuizs" :key="index">
            <p class="text-h5" style="margin: 10px;">{{index+'. '+ careerQuiz.question }}</p>
            <v-radio-group v-model="careerQuiz.answer">
                A<v-radio :label="careerQuiz.a" value="a" ></v-radio>
                B<v-radio :label="careerQuiz.b" value="b"></v-radio>
                C<v-radio :label="careerQuiz.c" value="c"></v-radio>
                D<v-radio :label="careerQuiz.d" value="d"></v-radio>
            </v-radio-group>
        </div>
        <div style="text-align: center;">
            <v-btn v-if="!adding" @click="adding = true">+</v-btn>
        </div>
        <v-text-field v-if="adding" label="题目" variant="outlined" v-model="newCareerQuizs.question" style="margin: 10px;"></v-text-field>
        <v-radio-group v-if="adding" v-model="newCareerQuizs.answer">
            <div style="display: flex">
                A<v-radio :label="newCareerQuizs.a" value="a"></v-radio><v-text-field v-model="newCareerQuizs.a" variant="outlined"></v-text-field>
            </div>
            <div style="display: flex">
                B<v-radio :label="newCareerQuizs.b" value="b"></v-radio><v-text-field v-model="newCareerQuizs.b" variant="outlined"></v-text-field>
            </div>
            <div style="display: flex">
                C<v-radio :label="newCareerQuizs.c" value="c"></v-radio><v-text-field v-model="newCareerQuizs.c" variant="outlined"></v-text-field>
            </div>
            <div style="display: flex">
                D<v-radio :label="newCareerQuizs.d" value="d"></v-radio><v-text-field v-model="newCareerQuizs.d" variant="outlined"></v-text-field>
            </div>

        </v-radio-group>
        <div style="text-align: center;">
            <v-btn v-if="adding" @click="addCareerQuizzesFunc">保存</v-btn>
            <v-btn v-if="adding" @click="adding=false">取消</v-btn>
        </div>
    </v-card>
</template>
<script setup lang="ts">
import { addCareerQuizze, delCareerQuiz, updateCareerQuiz, getCareerQuizList } from '@/api/api/careerApi.ts'
import { CareerQuiz } from '@/api/type/careerType.ts'
import { onMounted, ref } from 'vue';
let props = defineProps<{
    id: string,
}>()
onMounted(() => {
    careerId.value = props.id
})
const careerId = ref('')
const adding = ref(false)
const careerQuizs = ref<CareerQuiz[]>([])
const newCareerQuizs = ref<CareerQuiz>({})
const addCareerQuizzesFunc = function() {
    addCareerQuizze(newCareerQuizs.value).then((res:any)=>{
        if(res.code == 200) {
            newCareerQuizs.value = {}
            getCareerQuizListFunc()
        }
    })
}
const updateCareerQuizFunc = function(index){

}
const getCareerQuizListFunc = function () {
    getCareerQuizList({ data: careerId.value, page: 1, limit: 10 }).then((res: any) => {
        if (res.code == 200) {
            careerQuizs.value = res.data
        }
    })
}
getCareerQuizListFunc()
</script>
<style scoped>
.container {
    width: 70vh;
    height: 70vw;
    overflow: scroll;
    background-color: white;
}
</style>