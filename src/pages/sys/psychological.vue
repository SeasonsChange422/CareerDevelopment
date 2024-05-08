<!--
 * @Author: Dhx
 * @Date: 2024-05-01 17:34:25
 * @Description: 
 * @FilePath: \CareerDevelopment\src\pages\sys\psychological.vue
-->
<!--
 * @Author: Dhx
 * @Date: 2024-05-01 17:34:25
 * @Description: 
 * @FilePath: \CareerDevelopment\src\pages\index\psychological.vue
-->
<template>
    <v-infinite-scroll :item="psychologicals" :onLoad="load">
        <div class="center">
            <div class="testContainer">
                <div class="text-h5">心理测试</div>
                <v-btn variant="outlined" @click="startTest">开始测试</v-btn>
            </div>
            <div class="psychologicalContainer">
                <div style="margin: 20px;" class="text-h5">心理科普</div>
                <div class="psychologicals">
                    <commonCard v-for="(psychological,index) in psychologicals" :item="psychological" :key="index" :path="'/sys/details?type=psychological&id='+psychological.id"></commonCard>
                </div>
                
            </div>
        </div>
    </v-infinite-scroll>
    <v-dialog width="auto" v-model="testDialog">
        <testComponent :items="tests" :type="'psychological'"></testComponent>
    </v-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import {Psychological,PsychologicalTest} from '@/api/type/psychologicalType.ts'
import {getPsychologicalList,getRandomPsychologicalTest} from '@/api/api/psychologicalApi.ts'
const psychologicals = ref<Psychological[]>([

])
const testDialog = ref(false)
const loaded = ref(true)
const tests = ref<PsychologicalTest[]>([])
const load = async function ({ done }) {
    if(loaded.value){
        done('ok')
        return
    }
    loaded.value = true
    getPsychologicalListFunc()
    done('ok')
}
const getPsychologicalListFunc = function () {
    getPsychologicalList().then((res:any)=>{
        if(res.code == 200) {
            psychologicals.value = psychologicals.value.concat(res.data)
        }
    })
}
const startTest = function () {
    testDialog.value = true
    getRandomPsychologicalQuizFunc()
}

const getRandomPsychologicalQuizFunc = function () {
    getRandomPsychologicalTest({ size: 50 }).then((res: any) => {
        if (res.code == 200) {
            tests.value = res.data
        }
    })
}
getPsychologicalListFunc()
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
    background-image: url('/psychological.png');
    justify-content: space-between;
}
.psychologicalContainer {
    position: relative;
    width: 100%;
    min-height: 150px;
    background-color: white;
    border-radius: 20px;
    padding: 20px;
    margin-top: 40px;
}
.psychologicals{
    display: flex;
    flex-wrap:wrap;
    justify-content: space-around;
}
</style>