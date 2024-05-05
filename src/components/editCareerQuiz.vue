<template>
    <v-card class="container">
        <div v-for="(careerQuiz, index) in careerQuizs" :key="index">
            <div style="display: flex;justify-items: center;">
                <v-btn icon="mdi-minus-circle" size="x-small" @click="deleteQuizFunc(index)"></v-btn>
                <p class="text-h5" style="margin-left: 10px;">{{ '问题' + index + '. ' + careerQuiz.question }}</p>
            </div>

            <v-radio-group v-model="careerQuiz.answer">
                A<v-radio :label="careerQuiz.a" value="a" @click="updateCareerQuizFunc(index, 'a')"></v-radio>
                B<v-radio :label="careerQuiz.b" value="b" @click="updateCareerQuizFunc(index, 'b')"></v-radio>
                C<v-radio :label="careerQuiz.c" value="c" @click="updateCareerQuizFunc(index, 'c')"></v-radio>
                D<v-radio :label="careerQuiz.d" value="d" @click="updateCareerQuizFunc(index, 'd')"></v-radio>
            </v-radio-group>
        </div>
        <div style="text-align: center;">
            <v-btn v-if="!adding" @click="adding = true">+</v-btn>
        </div>
        <v-text-field v-if="adding" label="题目" variant="outlined" v-model="newCareerQuizs.question"
            style="margin: 10px;"></v-text-field>
        <v-radio-group v-if="adding" v-model="newCareerQuizs.answer">
            <div style="display: flex">
                A<v-radio :label="newCareerQuizs.a" value="a"></v-radio><v-text-field label="选项A"
                    v-model="newCareerQuizs.a" variant="outlined"></v-text-field>
            </div>
            <div style="display: flex">
                B<v-radio :label="newCareerQuizs.b" value="b"></v-radio><v-text-field label="选项B"
                    v-model="newCareerQuizs.b" variant="outlined"></v-text-field>
            </div>
            <div style="display: flex">
                C<v-radio :label="newCareerQuizs.c" value="c"></v-radio><v-text-field label="选项C"
                    v-model="newCareerQuizs.c" variant="outlined"></v-text-field>
            </div>
            <div style="display: flex">
                D<v-radio :label="newCareerQuizs.d" value="d"></v-radio><v-text-field label="选项D"
                    v-model="newCareerQuizs.d" variant="outlined"></v-text-field>
            </div>

        </v-radio-group>
        <div style="text-align: center;">
            <v-btn v-if="adding" @click="addCareerQuizzesFunc">保存</v-btn>
            <v-btn v-if="adding" @click="adding = false">取消</v-btn>
        </div>

    </v-card>
    <!-- <div class="bottomBar">
        <v-btn color="rgba(79,193,255)" @click="addCareerQuizzesFunc"
            style="top:50%;transform: translate(0,-50%);">保存</v-btn>
    </div> -->
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
const newCareerQuizs = ref<CareerQuiz>({
    careerId: '',
    question: '',
    answer: 'a',
    a: '非常同意',
    b: '比较同意',
    c: '不太同意',
    d: '很不同意',
})
const deleteQuizFunc = function (index: number) {
    delCareerQuiz(careerQuizs.value[index]).then((res: any) => {
        if (res.code == 200) {
            getCareerQuizListFunc()
        }
    })
}
const addCareerQuizzesFunc = function () {
    newCareerQuizs.value.careerId = careerId.value
    addCareerQuizze(newCareerQuizs.value).then((res: any) => {
        if (res.code == 200) {
            newCareerQuizs.value = {
                question: '',
                answer: 'a',
                a: '非常同意',
                b: '比较同意',
                c: '不太同意',
                d: '很不同意',
            }
            getCareerQuizListFunc()
        }
    })
}
const updateCareerQuizFunc = function (index, answer) {
    careerQuizs.value[index].answer = answer
    updateCareerQuiz(careerQuizs.value[index]).then((res: any) => {
        if (res.code == 200) {
            // getCareerQuizListFunc()
        }
    })
}
const getCareerQuizListFunc = function () {
    getCareerQuizList({ data: careerId.value, page: 1, limit: 10 }).then((res: any) => {
        if (res.code == 200) {
            careerQuizs.value = res.data
        }
    })
}
onMounted(()=>{
    setTimeout(()=>{
        getCareerQuizListFunc()
    },500)
})
</script>
<style scoped>
.container {
    width: 70vh;
    height: 70vw;
    overflow-y: scroll;
    background-color: white;
    padding: 20px;
    padding-bottom: 60px;
}

.bottomBar {
    position: fixed;
    bottom: 0;
    height: 50px;
    width: 100%;
    background-color: white;
    text-align: right;
    padding-right: 10px;
    box-shadow: rgba(0, 0, 0, 0.3) 0 -1px 5px;
}
</style>