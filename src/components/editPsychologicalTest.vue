<template>
    <v-card class="container">
        <div v-for="(psychologicalTest, index) in psychologicalTests" :key="index">
            <div style="display: flex;justify-items: center;">
                <v-btn icon="mdi-minus-circle" size="x-small" @click="deleteTestFunc(index)"></v-btn>
                <p class="text-h5" style="margin-left: 10px;">{{ '问题' + (index+1) + '. ' + psychologicalTest.question }}</p>
            </div>
            <div>A {{ psychologicalTest.tr }}</div>
            <div>B {{ psychologicalTest.fa }}</div>
        </div>
        <div style="text-align: center;">
            <v-btn v-if="!adding" @click="adding = true">+</v-btn>
        </div>
        <div><v-text-field v-if="adding" label="题目" variant="outlined" density="compact"
                v-model="newPsychologicalTests.question" style="margin: 10px;"></v-text-field></div>
        <div>
            <v-radio-group v-if="adding" v-model="newPsychologicalTests.answer">
                <div style="display: flex">
                    <v-radio :label="newPsychologicalTests.tr" value="tr"></v-radio>
                        <v-text-field density="compact" label="A" v-model="newPsychologicalTests.tr"
                            variant="outlined"></v-text-field>
                </div>
                <div style="display: flex">
                    <v-radio :label="newPsychologicalTests.fa" value="fa"></v-radio>
                        <v-text-field label="B" density="compact" v-model="newPsychologicalTests.fa"
                            variant="outlined"></v-text-field>
                </div>
            </v-radio-group>
        </div>

        <div style="text-align: center;">
            <v-btn v-if="adding" @click="addPsychologicalTestzesFunc">保存</v-btn>
            <v-btn v-if="adding" @click="adding = false">取消</v-btn>
        </div>

    </v-card>
    <!-- <div class="bottomBar">
        <v-btn color="rgba(79,193,255)" @click="addPsychologicalTestsFunc"
            style="top:50%;transform: translate(0,-50%);">保存</v-btn>
    </div> -->
</template>
<script setup lang="ts">
import { addPsychologicalTest, delPsychologicalTest, updatePsychologicalTest, getPsychologicalTestList } from '@/api/api/psychologicalApi.ts'
import { PsychologicalTest } from '@/api/type/psychologicalType.ts'
import { onMounted, ref } from 'vue';
let props = defineProps<{
    id: string,
}>()
onMounted(() => {
    setTimeout(() => {
        psychologicalId.value = props.id
        getPsychologicalTestListFunc()
    }, 500)

})
const psychologicalId = ref('')
const adding = ref(false)
const psychologicalTests = ref<PsychologicalTest[]>([])
const newPsychologicalTests = ref<PsychologicalTest>({
    question: '',
    tr: '',
    fa: '',
    answer: 'tr',
    psychologicalId: '',
})
const deleteTestFunc = function (index: number) {
    delPsychologicalTest(psychologicalTests.value[index]).then((res: any) => {
        if (res.code == 200) {
            getPsychologicalTestListFunc()
        }
    })
}
const addPsychologicalTestzesFunc = function () {
    newPsychologicalTests.value.psychologicalId = psychologicalId.value
    addPsychologicalTest(newPsychologicalTests.value).then((res: any) => {
        if (res.code == 200) {
            newPsychologicalTests.value = {
                question: '',
                tr: '',
                fa: '',
                answer: 'tr',
                psychologicalId: '',
            }
            getPsychologicalTestListFunc()
        }
    })
}
const updatePsychologicalTestFunc = function (index, answer) {
    psychologicalTests.value[index].answer = answer
    updatePsychologicalTest(psychologicalTests.value[index]).then((res: any) => {
        if (res.code == 200) {
            // getPsychologicalTestListFunc()
        }
    })
}
const getPsychologicalTestListFunc = function () {
    getPsychologicalTestList({ data: psychologicalId.value, page: 1, limit: 10 }).then((res: any) => {
        if (res.code == 200) {
            psychologicalTests.value = res.data
        }
    })
}
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