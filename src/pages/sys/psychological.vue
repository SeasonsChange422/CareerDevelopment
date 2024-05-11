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
    <!-- <v-infinite-scroll :item="psychologicals" :onLoad="load">
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
    </v-dialog> -->
    <div
        style="background-image: url('/psychological-background.png');background-size: 100% 100%;background-position: center center;width: 100%;height: calc(100vh);">
        <div
            style="width: 1200px;height: 600px;background-color: rgba(255,255,255,0.8);position: relative;left: 50%;top: 50%;transform: translate(-50%,-50%);">
            <div v-if="windowTest == 0">
                <div
                    style="height: 400px;line-height: 400px;font-size: 50px;font-family: 仿宋;font-weight: 400;text-align: center;">
                    中小学生心理健康测评
                </div>
                <div style="height: 200px;text-align: center;">
                    <v-btn variant="outlined" @click="enterTest">开始测试</v-btn>
                </div>
            </div>
            <div v-else-if="windowTest == 1"
                style="position: relative;color: rgb(223,70,37);padding: 50px;height: 100%;">
                <span style="font-family: 仿宋;font-size: 20px;">
                    下面是有关你近10天状态的问题，请你仔细阅读每一个题目，然后根据你自己的实际情况认真填写。
                    每一个题目没有对错之分,请你尽快回答，
                    不要在每道题上过多思考。每个题目后面都有五个等级(无、轻度、中度、偏重、严重)供你选择，依次用1、2、3、4、5表示;只能选一个等级，在相应的数字上划“√”。
                </span>
                <div style="position: absolute;bottom: 50px;right: 50px;">
                    <v-btn style="color: rgb(223,70,37);" variant="outlined" @click="enterTest">确认开始做答</v-btn>
                </div>
            </div>
            <div v-else-if="windowTest == 2">
                <div style="height: 540px;" :key="questionIndex">
                    <div style="text-align: center;font-size: 30px;height: 100px;line-height: 100px;font-weight: 900;">
                        问题{{ questionIndex }}
                    </div>
                    <div
                        style="height: 150px;line-height: 150px;font-size: 24px;color: rgb(255,90,117);text-align: center;font-weight: 700;">
                        {{ tests[questionIndex].question }}
                    </div>
                    <v-radio-group v-model="answer[questionIndex]" style="width: 100%;" class="radio-group">
                        <div class="flex">
                            <v-card hover @click="choose(1)" class="card">
                                <div class="line">
                                </div>
                                <v-radio label="无" :value="1" style="width: 100%;">
                                </v-radio>
                            </v-card>
                            <v-card hover @click="choose(2)" class="card">
                                <div class="line">
                                </div>
                                <v-radio label="轻度" :value="2" style="width: 100%;">
                                </v-radio>
                            </v-card>
                        </div>
                        <div class="flex">
                            <v-card hover @click="choose(3)" class="card">
                                <div class="line">
                                </div>
                                <v-radio label="中度" :value="3" style="width: 100%;">
                                </v-radio>
                            </v-card>
                            <v-card hover @click="choose(4)" class="card">
                                <div class="line">
                                </div>
                                <v-radio label="偏重" :value="4" style="width: 100%;">
                                </v-radio>
                            </v-card>
                        </div>
                        <div class="flex">
                            <v-card hover @click="choose(5)" class="card">
                                <div class="line">
                                </div>
                                <v-radio label="重度" :value="5" style="width: 100%;">
                                </v-radio>
                            </v-card>
                        </div>
                    </v-radio-group>
                </div>
                <div style="height: 60px;display: flex;justify-content: space-between;padding: 0 20px;">
                    <v-btn :disabled="questionIndex == 0" variant="outlined" color="rgb(50,202,153)"
                        @click="lastQuestion">上一题</v-btn>
                    <v-btn :disabled="answer.includes(0)" variant="outlined" color="rgb(50,202,153)"
                        @click="submit">提交</v-btn>
                    <v-btn :disabled="questionIndex == tests.length-1" variant="outlined" color="rgb(50,202,153)"
                        @click="nextQuestion">下一题</v-btn>
                </div>
            </div>
            <div v-else-if="windowTest == 3">
                <div style="height: 300px;line-height: 300px;font-size: 32px;text-align: center;font-weight: 700;font-family: 仿宋;">
                    测试结果:{{ status }}
                </div>
                <div style="height: 300px;" v-if="result.length !=0">
                    <div style="text-align: center;font-size: 20px;font-family: 仿宋;">
                        可能存在以下症状：
                    </div>
                    <div style="display: flex;justify-content: center">
                        <div v-for="factor in result" :key="factor" style="margin: 10px;">
                            <RouterLink :to="'/sys/details?type=psychological&id='+psychologicals.find((item)=>item.name==factor).id">{{factor}}</RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Psychological, PsychologicalTest } from '@/api/type/psychologicalType.ts'
import { getPsychologicalList, getRandomPsychologicalTest } from '@/api/api/psychologicalApi.ts'
const psychologicals = ref<Psychological[]>([])
const tests = ref<PsychologicalTest[]>([])
const windowTest = ref(0)
const questionIndex = ref(0)
const answer = ref<number[]>([])
const chooseNum = ref(0)
const status = ref('')
const result = ref<string[]>([])
const getPsychologicalListFunc = function () {
    getPsychologicalList().then((res: any) => {
        if (res.code == 200) {
            psychologicals.value = psychologicals.value.concat(res.data)
        }
    })
}

const getRandomPsychologicalQuizFunc = function () {
    getRandomPsychologicalTest({ size: 60 }).then((res: any) => {
        if (res.code == 200) {
            tests.value = res.data
            for (let i in res.data) {
                answer.value.push(0)
            }
        }
    })
}
const enterTest = function () {
    windowTest.value++
}
const factorIndex = ref<number[][]>(
    [
        [3, 10, 12, 22, 23, 48], // 强迫因子
        [11, 20, 24, 26, 47, 49], // 偏执因子
        [19, 21, 25, 50, 52, 58], // 敌对因子
        [4, 17, 18, 45, 51, 59], // 人际关系紧张敏感因子
        [5, 13, 14, 16, 44, 57], // 抑郁因子
        [6, 15, 34, 43, 46, 56], // 焦虑因子
        [31, 33, 36, 38, 40, 55], // 学习压力感因子
        [1, 8, 9, 29, 39, 41], // 适应不良因子
        [2, 7, 27, 32, 35, 53], // 情绪不稳定因子
        [28, 30, 37, 42, 54, 60] // 心理不平衡因子
    ]
)
const factorNames = ref<string[]>(
    [
        "强迫",
        "偏执",
        "敌对",
        "人际关系紧张敏感",
        "抑郁",
        "焦虑",
        "学习压力感",
        "适应不良",
        "情绪不稳定",
        "心理不平衡"
    ]
)
const choose = function (value: number) {
    if (answer.value[questionIndex.value] == 0)
        chooseNum.value++
    answer.value[questionIndex.value] = value
    console.log(questionIndex.value)
    if (questionIndex.value < tests.value.length - 1)
        setTimeout(() => {
            nextQuestion()
        }, 200)
}

const lastQuestion = function () {
    questionIndex.value--
}
const nextQuestion = function () {
    questionIndex.value++
}

const submit = function () {
    let total = 0
    for (let i = 0; i < answer.value.length; i++) {
        total += answer.value[i]
    }
    let average = total / answer.value.length
    if (average < 2) status.value = "心理比较健康"
    else if (average < 5) status.value = "存在一定程度的心理问题"
    else if (average == 5) status.value = "存在严重的心理问题"
    for (let i = 0; i < factorNames.value.length;i++){
        let index = factorIndex.value[i]
        total = 0
        for(let j = 0;j< index.length;j++) {
            total += answer.value[index[j]]
        }
        if(total>=18)result.value.push(factorNames.value[i])
        if(total==30)status.value = "存在严重的心理问题"
    }
    windowTest.value++
}
onMounted(() => {
    getPsychologicalListFunc()
    getRandomPsychologicalQuizFunc()
})
</script>
<style scoped>
/* .center {
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
} */
.radio-group .flex {
    position: relative;
    display: flex;
    width: 700px;
    left: 50%;
    transform: translate(-50%);
    justify-content: space-between;
    margin-top: 20px;
}

.radio-group div .card {
    width: 300px;
    display: flex;
}

.radio-group div .card .line {
    background-color: rgb(50, 202, 153);
    width: 10px;
}
</style>