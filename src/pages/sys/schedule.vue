<template>
    <div class="center">
        <v-list lines="one">
            <v-list-item v-for="(schedule, index) in schedules" :key="index" :title="schedule.schedule"
                :subtitle="schedule.notes">
                <template v-slot:append>
                    <v-checkbox label="已完成" :disabled="schedule.status" v-model="schedule.status" @click="updateSchedultFunc(index)"></v-checkbox>
                </template>
                <template v-slot:prepend>
                    <v-btn icon="mdi-minus-circle" size="x-small" @click="deleteSchedultFunc(index)" style="margin-right: 20px;"></v-btn>
                </template>
                <div>创建时间：{{parseDate(parseDateString(schedule.time))}}</div>
                <div style="height: 1px;background-color: grey;width: 97%;margin: auto;margin-top: 5px;"></div>
            </v-list-item>
            <div v-if="isAdd == true">
                <v-text-field v-model="newSchedule.schedule" label="规划" variant="outlined"></v-text-field>
                <v-text-field v-model="newSchedule.notes" label="备注" variant="outlined"></v-text-field>
                <div style="display: flex;justify-content: space-between;">
                    <v-btn @click="addScheduleFunc">保存</v-btn>
                    <v-btn @click="isAdd = false">取消</v-btn>
                </div>
            </div>
            <div v-else style="text-align: center;">
                <v-btn variant="outlined" @click="isAdd = true">+</v-btn>
            </div>
        </v-list>
    </div>
</template>
<script setup lang="ts">
import { addSchedule, delSchedule, getSchedule, updateSchedule } from '@/api/api/userApi.ts'
import { Schedule } from '@/api/type/userType.ts'
import { ref } from 'vue';
const schedules = ref<Schedule[]>([])
const isAdd = ref(false)
let newSchedule = ref<Schedule>({
    id: '',
    time: '',
    schedult: '',
    notes: '',
    status: ''
})
const getScheduleFunc = function () {
    getSchedule().then((res: any) => {
        if (res.code == 200) {
            schedules.value = res.data
            for (let i = 0; i < schedules.value.length; i++) {
                if (schedules.value[i].status == 1)
                    schedules.value[i].status = true
                else if (schedules.value[i].status == 0)
                    schedules.value[i].status = false
            }
            schedules.value.sort((a,b)=>{return a.status - b.status})
        }
    })
}
const deleteSchedultFunc = function (index: number) {
    delSchedule({id:schedules.value[index].id}).then((res:any)=>{
        if(res.code == 200) {
            getScheduleFunc()
        }
    })
}
const updateSchedultFunc = function (index: number) {
    setTimeout(() => {
        schedules.value[index].status = schedules.value[index].status?'1':'0'
        schedules.value[index].time = parseDate(parseDateString(schedules.value[index].time))
        updateSchedule(schedules.value[index]).then((res: any) => {
            if (res.code == 200) {
                getScheduleFunc()
            }
        })
    }, 1000)

}
const addScheduleFunc = function () {
    newSchedule.value.time = parseDate(new Date())

    addSchedule(newSchedule.value).then((res: any) => {
        if (res.code == 200) {
            newSchedule.value = {
                id: '',
                time: '',
                schedult: '',
                notes: '',
                status: ''
            }
            getScheduleFunc()
        }
    })
}
const parseDate = function (value) {
    const year = value.getFullYear()
    const month = String(value.getMonth() + 1).padStart(2, '0')
    const day = String(value.getDate()).padStart(2, '0')
    const hours = String(value.getHours()).padStart(2, '0')
    const minutes = String(value.getMinutes()).padStart(2, '0')
    const seconds = String(value.getSeconds()).padStart(2, '0')
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
const parseDateString = function (dateString) {
    const parts = dateString.split(/[T.:+-]/); // 使用正则表达式分割日期字符串
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1; // 月份是从0开始的，所以要减1
    const day = parseInt(parts[2]);
    const hour = parseInt(parts[3]);
    const minute = parseInt(parts[4]);
    const second = parseInt(parts[5]);

    return new Date(Date.UTC(year, month, day, hour, minute, second)); // 使用UTC时间创建Date对象
}
getScheduleFunc()
</script>
<style scoped>
.center {
    position: relative;
    width: 1200px;
    min-height: 100vh;
    margin: auto;
    padding-top: 20px;
}
</style>