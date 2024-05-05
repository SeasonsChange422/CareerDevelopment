<template>
    <v-data-table :headers="headers" :items="items" style="min-height: 100vh;">
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>知识类型</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-btn class="mb-2" color="primary" dark @click="addItem">
                    新增类型
                </v-btn>
            </v-toolbar>
        </template>
        <template v-slot:item.img="{ value,index }">
            <v-file-input v-if="actionsIndex.editIndex == index" :rules="rules" v-model="avatar"
                accept="image/png, image/jpeg, image/bmp" label="Avatar" placeholder="Pick an avatar"
                prepend-icon="mdi-camera" @change="upload"></v-file-input>
                <v-img v-else :src="value" width="100" height="100"></v-img>
        </template>
        <template v-slot:item.name="{ value, index }">
            <v-text-field v-if="actionsIndex.editIndex == index" density="compact" style="transform: translate(0,20%);"
                v-model="updateItem.name" variant="outlined"></v-text-field>
            <div v-else>{{ value }}</div>
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
            <v-btn v-if="actionsIndex.editIndex == index" variant="outline" color="red"
                @click="actionsIndex.editIndex = -1">取消</v-btn>
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
    <v-snackbar v-model="message.model" :color="message.color" :timeout="message.timeout">
        {{ message.text }}
    </v-snackbar>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { updateCulturalType, getCulturalType, addCulturalType, getCulturalTypeList, delCulturalType } from '@/api/api/culturalApi.ts';
import { CulturalType } from '@/api/type/culturalType.ts'
import { useRouter } from 'vue-router';
import { uploadAvatar } from '../../api/api/userApi';
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
const avatar = ref<File[]>([])
const headers = [ // 字段名与列名的对应关系
    { title: 'id', key: 'id' },
    { title: '类型', key: 'name' },
    { title: '封面', key: 'img' },
    { title: 'Actions', key: 'actions', sortable: false },
]
const dialog = ref(false)
const updateItem = ref<CulturalType>({
    id: '',
    name: '',
    img: '',
})
const newItem = ref<CulturalType>({
    id: '',
    name: '',
    img: '',
})
const items = ref<CulturalType[]>([])

const actionsIndex = ref({ // 当前操作的数据在数组中的索引
    deleteIndex: -1, //删除
    editIndex: -1, //编辑
    addIndex: -1
})
const getListForm = ref<{
    page: number;
    limit: number;
}>({
    page: 1,
    limit: 10,
})
const upload = function () {
    uploadAvatar(avatar.value[0]).then((res: any) => {

        if (res.code == 200) {
            updateItem.value.img = res.data
            message.value.success('上传成功')
        } else {
            message.value.error(res.msg)
        }
    })
}
const addItem = function () {
    if (actionsIndex.value.addIndex == 0) return
    actionsIndex.value.addIndex = 0
    actionsIndex.value.editIndex = 0
    items.value = [JSON.parse(JSON.stringify(newItem.value))].concat(items.value)
}
const editItem = function (index: number) {
    actionsIndex.value.editIndex = index
    updateItem.value = JSON.parse(JSON.stringify(items.value[index])) //深拷贝到updateUser
}
const deleteItem = function (index: number) {
    actionsIndex.value.deleteIndex = index
    dialog.value = true
}
const updateItemFunc = function () {
    if (actionsIndex.value.addIndex == 0) { // 添加
        addCulturalType(updateItem.value).then((res: any) => {
            if (res.code == 200) {
                message.value.success('添加成功')
                getItemsFunc()
            }
        })
    } else {
        updateCulturalType(updateItem.value).then((res: any) => {
            if (res.code == 200) {
                message.value.success('更新成功')
                getItemsFunc()
            }
        })
    }

}
const getItemsFunc = function () {
    actionsIndex.value.editIndex = -1
    actionsIndex.value.addIndex = -1
    getCulturalTypeList(getListForm.value).then((res: any) => {
        if (res.code == 200) {
            items.value = res.data
        }
    })
}
const deleteItemFunc = function () {

    delCulturalType({ id: items.value[actionsIndex.value.deleteIndex].id }).then((res: any) => {
        if (res.code == 200) {
            message.value.success('删除成功')
            getItemsFunc()
        }
    })
    dialog.value = false
    actionsIndex.value.deleteIndex = -1
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
const rules = [
    value => {
        return !value || !value.length || value[0].size < 2000000 || '图片必须小于2 MB!'
    },
]
watch(() => getListForm.value.page, (newValue, oldValue) => {
    getItemsFunc()
})
getItemsFunc()
</script>