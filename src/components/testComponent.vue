<template>
    <v-card v-if="score != -1">
        <div style="line-height: 100px;font-size: 20px;">{{ score }}分</div>
    </v-card>
    <v-card v-else>
        <v-progress-linear v-model="progress" color="rgb(50, 202, 153)" height="25">
            <strong>{{ Math.ceil(progress) }}%</strong>
        </v-progress-linear>
        <v-data-iterator :items="props.items" :page="page" :items-per-page="1" style="width: 600px;height: 350px;">
            <template v-slot:default="{ items }">
                <v-container class="pa-2" fluid>
                    <v-row style="width: 100%;">
                        <v-col v-for="item in items" :key="item.raw.id">
                            <radio :item="item.raw" :type="props.type" :check="check"></radio>

                        </v-col>
                    </v-row>
                </v-container>
            </template>

            <template v-slot:footer="{ page, pageCount }">
                <div class="d-flex align-center justify-center pa-4">
                    <v-btn :disabled="page === 1" density="comfortable" icon="mdi-arrow-left" variant="tonal" rounded
                        @click="prevPage"></v-btn>

                    <v-btn :disabled="page >= pageCount" density="comfortable" icon="mdi-arrow-right" variant="tonal"
                        rounded @click="nextPage"></v-btn>
                </div>
                <div style="text-align: center;"><v-btn v-if="page == pageCount" @click="result" :disabled="progress!=100">查看结果</v-btn></div>
            </template>
        </v-data-iterator>
    </v-card>

</template>
<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const props = defineProps<{
    items: {
        id: string;
        careerId: string;
        psychologicalId: string;
        question: string;
        answer: string;
        a: string;
        b: string;
        c: string;
        d: string;
        tr: string;
        fa: string;
    }[],
    type: string
}>()
const progress = ref(0)
const page = ref(1)
const calc = []
let trNum = 0
let faNum = 0
const score = ref(-1)
const check = function (id: string, tr: boolean) {
    if (props.type == 'career')
        if (tr) calc[id]++
        else calc[id]--
    else if (props.type == 'psychological') {
        if (tr) calc[id]++
        else calc[id]--
    }
    if(page.value <= props.items.length){
        setTimeout(()=>{
            nextPage()
        },100)
    }
}
const result = function () {
    let max = 0
    let maxId = props.items[0].careerId||props.items[0].psychologicalId
    for (let item in calc) {
        if (calc[item] > max) {
            max = calc[item]
            maxId = item
        }
    }
    if (props.type == 'career') {
        router.push('/sys/details?type=career&id=' + maxId)
    }
    else if (props.type == 'psychological') {
        router.push('/sys/details?type=psychological&id=' + maxId)
    }

}
const prevPage = function () {
    page.value--
    change(page.value)
}
const nextPage = function () {
    page.value++
    change(page.value)
}

onMounted(() => {
    setTimeout(() => {
        for (let item in props.items) {
            if (props.type == 'career')
                calc[props.items[item].careerId] = 0
            else {
                calc[props.items[item].psychologicalId] = 0
            }
        }
    }, 1000)
})
const change = function (page: number) {
    progress.value = (page - 1) * 100 / props.items.length
}
</script>
<style scoped></style>