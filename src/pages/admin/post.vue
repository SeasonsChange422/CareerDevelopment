<template>
    <v-data-table :headers="headers" :items="items" style="min-height: 100vh;">
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>文化知识</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>

                <v-btn class="mb-2" color="primary" dark @click="addItem">
                    新增文章
                </v-btn>

            </v-toolbar>
        </template>
        <template v-slot:item.title="{ value, index }">
            <v-text-field v-if="actionsIndex.editIndex == index" density="compact" style="transform: translate(0,20%);"
                v-model="updateItem.title" variant="outlined"></v-text-field>
            <div v-else>{{ value }}</div>
        </template>
        <template v-slot:item.typeId="{ value, index }">
            <div v-if="actionsIndex.editIndex == index" style="transform: translate(0,14px);">
                <v-select v-model="updateItem.typeId" density="compact" :items="typeMap" variant="outlined"
                    persistent-hint single-line item-title="name" item-value="id"></v-select>
            </div>
            <div v-else>{{ getTypeName(value) }}</div>
        </template>
        <template v-slot:item.text="{ value, index }">
            <v-text-field v-if="actionsIndex.editIndex == index" density="compact" style="transform: translate(0,20%);"
                v-model="updateItem.text" variant="outlined" @click="editContent(index)"></v-text-field>
            <div v-else v-html="value" style="overflow: hidden;max-height:60px;"></div>
        </template>
        <template v-slot:item.actions="{ item, index }">
            <v-icon v-if="actionsIndex.editIndex != index" class="me-2" size="small" @click="editItem(index)">
                mdi-pencil
            </v-icon>
            <v-icon v-if="actionsIndex.editIndex != index" size="small" @click="deleteItem(index)">
                mdi-delete
            </v-icon>
            <v-btn v-if="actionsIndex.editIndex == index" variant="outline" color="primary"
                @click="updateItemFunc">保存</v-btn>
            <v-btn v-if="actionsIndex.editIndex == index" variant="outline" color="red" @click="cancelEdit">取消</v-btn>
        </template>
        <template v-slot:bottom>
            <div class="text-center pt-2">
                <v-pagination v-model="getListForm.page"
                    :length="getListForm.limit == items.length ? getListForm.page + 1 : getListForm.page"></v-pagination>
            </div>
        </template>
    </v-data-table>
    <v-dialog v-model="dialog" width="auto">
        <v-card max-width="400" text="确定删除">
            <template v-slot:actions>
                <v-btn class="ms-auto" text="删除" @click="deleteItemFunc" color="red"></v-btn>
                <v-btn class="ms-auto" text="取消" @click="dialog = false"></v-btn>
            </template>
        </v-card>
    </v-dialog>
    <v-dialog v-model="editDialog" width="auto">
        <editorComponent :editorContent="updateItem.text" :getContent="(html: string) => { updateItem.text = html }">
        </editorComponent>
        <template v-slot:actions>
            <v-btn class="ms-auto" text="关闭" @click="editDialog = false"></v-btn>
        </template>
    </v-dialog>
    <v-snackbar v-model="message.model" :color="message.color" :timeout="message.timeout">
        {{ message.text }}
    </v-snackbar>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { updateCulturalPost, getCulturalPost, addCulturalPost, listCulturalPost, delCulturalPost, getCulturalTypeList } from '@/api/api/culturalApi.ts';
import { CulturalPost, CulturalType } from '@/api/type/culturalType.ts'
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user.ts'
const userStore = useUserStore()
const router = useRouter()
const message = ref({
    model: false,
    timeout: 2000,
    text: '',
    color: '',
    success: (text) => { message.value.text = text; message.value.color = 'rgba(76,175,80)'; message.value.model = true },
    warning: (text) => { message.value.text = text; message.value.color = 'rgba(245,124,0)'; message.value.model = true },
    error: (text) => { message.value.text = text; message.value.color = 'rgba(211,47,47)'; message.value.model = true }
})
const headers = [ // 字段名与列名的对应关系
    { title: 'id', key: 'id' },
    { title: '类型', key: 'typeId' },
    { title: '标题', key: 'title' },
    { title: '内容', key: 'text' },
    // { title: '浏览量', key: 'watchNum' },
    // { title: '评论数', key: 'commentNum' },
    // { title: '点赞数', key: 'likeNum' },
    { title: '创建时间', key: 'createAt' },
    // { title: '是否已删除', key: 'hasDelete' },
    { title: 'Actions', key: 'actions', sortable: false },
]
const typeMap = ref<CulturalType[]>([])
const dialog = ref(false)
const editDialog = ref(false)
const updateItem = ref<CulturalPost>({
    id: '',
    typeId: '',
    title: '',
    text: '',
})
const newItem = ref<CulturalPost>({
    id: '',
    typeId: '',
    title: '',
    text: '',
})
const items = ref<CulturalPost[]>([])
const actionsIndex = ref({ // 当前操作的数据在数组中的索引
    deleteIndex: -1, //删除
    editIndex: -1, //编辑
    addIndex: -1
})
const getListForm = ref<{
    page: number;
    limit: number;
    type: string;
}>({
    page: 1,
    limit: 10,
    type: ''
})
const cancelEdit = function () {
    if (actionsIndex.value.addIndex == 0) {
        items.value = items.value.slice(1)
    }
    actionsIndex.value.editIndex = -1
    actionsIndex.value.addIndex = -1
}
const addItem = function () {
    if (actionsIndex.value.addIndex == 0) return
    actionsIndex.value.addIndex = 0
    actionsIndex.value.editIndex = 0
    items.value = [JSON.parse(JSON.stringify(newItem.value))].concat(items.value)
}
const editItem = function (index: number) {
    actionsIndex.value.editIndex = index
    updateItem.value = JSON.parse(JSON.stringify(items.value[index])) //updateItem
}
const deleteItem = function (index: number) {
    actionsIndex.value.deleteIndex = index
    dialog.value = true
}
const editContent = function (index: number) {
    editDialog.value = true
}
const updateItemFunc = function () {
    updateItem.value.createAt = parseDate(new Date())
    if (actionsIndex.value.addIndex == 0) { // 添加
        addCulturalPost(updateItem.value).then((res: any) => {
            message.value.success('添加成功')
            getItemsFunc()
        })
    } else {
        if (updateItem.value.createAt)
            updateItem.value.createAt = parseDate(new Date(parseDateString(updateItem.value.createAt)))
        updateCulturalPost(updateItem.value).then((res: any) => {
            message.value.success('更新成功')
            getItemsFunc()
        })
    }

}
const getItemsFunc = function () {
    cancelEdit()
    listCulturalPost(getListForm.value).then((res: any) => {
        if (res.code == 200) {
            items.value = res.data
        }
    })
}
const deleteItemFunc = function () {

    delCulturalPost({ id: items.value[actionsIndex.value.deleteIndex].id }).then((res: any) => {
        if (res.code == 200) {
            message.value.success('删除成功')
            getItemsFunc()
        }
    })
    dialog.value = false
    actionsIndex.value.deleteIndex = -1
}
const getTypeListFunc = function () {
    getCulturalTypeList().then((res: any) => {
        if (res.code == 200) {
            typeMap.value = res.data
        }
    })
}
const getTypeName = function (id: string) {
    for (let type in typeMap.value) {
        if (id == typeMap.value[type].id) return typeMap.value[type].name
    }
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

watch(() => getListForm.value.page, (newValue, oldValue) => {
    getItemsFunc()
})
getItemsFunc()
getTypeListFunc()
</script>