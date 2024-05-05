<template>
    <v-infinite-scroll :item="careers" :onLoad="load">
        <div class="center">
            <div class="testContainer">
                <div class="text-h5">职业测试</div>
                <v-btn variant="outlined" @click="startTest">开始测试</v-btn>
            </div>
            <div class="careerContainer">
                <div style="margin: 20px;" class="text-h5">职业科普</div>
                <div class="careers">
                    <commonCard v-for="(career, index) in careers" :item="career" :key="index"
                        :path="'/details?type=career&id=' + career.id"></commonCard>
                </div>

            </div>
        </div>
    </v-infinite-scroll>
    <v-dialog width="auto" v-model="testDialog">
        <testComponent :items="quizs" :type="'career'"></testComponent>
    </v-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { Career, CareerQuiz } from '@/api/type/careerType.ts'
import { getCareerList, getRandomCareerQuiz } from '@/api/api/careerApi.ts'
const careers = ref<Career[]>([

])
const loaded = ref(true)
const testDialog = ref(false)
const quizs = ref<CareerQuiz[]>([])
const load = async function ({ done }) {
    if (loaded.value) {
        done('ok')
        return
    }
    loaded.value = true
    getCareerListFunc()
    done('ok')
}
const getCareerListFunc = function () {
    getCareerList().then((res: any) => {
        if (res.code == 200) {
            careers.value = careers.value.concat(res.data)
        }
    })
}
const getRandomCareerQuizFunc = function () {
    getRandomCareerQuiz({ size: 50 }).then((res: any) => {
        if (res.code == 200) {
            quizs.value = res.data
        }
    })
}
const startTest = function () {
    testDialog.value = true
    getRandomCareerQuizFunc()
}
getCareerListFunc()
</script>
<style scoped>
.center {
    position: relative;
    width: 1200px;
    min-height: 100vh;
    margin: auto;
    padding-top: 20px;
    
}

.testContainer {
    position: relative;
    width: 100%;
    height: 100px;
    background-color: white;
    border-radius: 20px;
    padding: 20px;
    display: flex;
    background-size: cover;
    background-position: center center;
    background-image: url('/career.png');
    justify-content: space-between;
}

.careerContainer {
    position: relative;
    width: 100%;
    min-height: 150px;
    background-color: white;
    border-radius: 20px;
    padding: 20px;
    margin-top: 40px;
}

.careers {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>