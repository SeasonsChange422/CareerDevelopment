<!--
 * @Author: Dhx
 * @Date: 2024-04-29 20:56:27
 * @Description: 
 * @FilePath: \CareerDevelopment\src\pages\admin\user.vue
-->
<template>
    <v-data-table :headers="headers" :items="items" style="min-height: 100vh;">
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>用户</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <!-- <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ props }">
                        <v-btn class="mb-2" color="primary" dark v-bind="props">
                            新增用户
                        </v-btn>
                    </template>

</v-dialog> -->
            </v-toolbar>
        </template>
        <template v-slot:item.img="{ value }">
            <v-img :src="value" width="100" height="100"></v-img>
        </template>
        <template v-slot:item.isAdmin="{ value, index }">
            <p v-if="actionsIndex.editIndex != index">{{ value == 1 ? '是' : '否' }}</p>
            <v-select v-else label="Select" v-model="updateUser.isAdmin" density="compact" :items="adminOptions"
                variant="outlined"></v-select>
        </template>
        <template v-slot:item.actions="{ item, index }">
            <v-icon v-if="actionsIndex.editIndex != index" class="me-2" size="small" @click="editItem(index)">
                mdi-pencil
            </v-icon>
            <v-icon v-if="actionsIndex.editIndex != index" size="small" @click="deleteItem(index)">
                mdi-delete
            </v-icon>
            <v-btn v-if="actionsIndex.editIndex == index" variant="outline" color="primary" @click="updateItemFunc">保存</v-btn>
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
import { updateUser, getUser, addUser, getUserList, delUser } from '@/api/api/adminApi.ts';
import { UserInfo } from '@/api/type/userType.ts'
import { useRouter } from 'vue-router';
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
    { title: '头像', key: 'img' },
    { title: 'id', key: 'id' },
    { title: '用户名', key: 'username' },
    { title: '密码', key: 'password' },
    { title: '性别', key: 'sex' },
    { title: '介绍', key: 'introduction' },
    { title: '文化程度', key: 'education' },
    { title: '是否为管理员', key: 'isAdmin' },
    { title: '生日', key: 'birth' },
    { title: 'Actions', key: 'actions', sortable: false },
]
const dialog = ref(false)
const updateItem = ref<UserInfo>({
    id: '',
    img: '',
    birth: '',
    sex: '',
    introduction: '',
    username: '',
    password: '',
    education: '',
    isAdmin: 0
})
const items = ref<UserInfo[]>([]) // 用户列表
const adminOptions = [ // 管理员选项
    { label: '是', value: '1' },
    { label: '否', value: '0' },
]
const actionsIndex = ref({ // 当前操作的数据在数组中的索引
    deleteIndex: -1, //删除
    editIndex: -1 //编辑
})
const getListForm = ref<{
    page: number;
    limit: number;
}>({
    page: 1,
    limit: 10,
})
const editItem = function (index: number) {
    actionsIndex.value.editIndex = index
    updateItem.value = JSON.parse(JSON.stringify(items.value[index])) //深拷贝到updateUser
}
const deleteItem = function (index: number) {
    actionsIndex.value.deleteIndex = index
    dialog.value = true
}
const updateItemFunc = function () {
    updateItem.value.birth = parseDate(new Date(updateItem.value.birth))

    updateUser(updateItem.value).then((res:any)=>{
        if(res.code == 200) {
            message.value.success('更新成功')
            setTimeout(()=>{
                router.go(0)
            },2000)
        }
    })
}
const getItemsFunc = function () {
    getUserList(getListForm.value).then((res: any) => {
        if (res.code == 200) {
            items.value = res.data
        }
    })
}
const deleteItemFunc = function () {

    delUser({ id: items.value[actionsIndex.value.deleteIndex].id }).then((res: any) => {
        if (res.code == 200) {
            message.value.success('删除成功')
            setTimeout(() => {
                router.go(0)
            }, 2000);
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
watch(() => getListForm.value.page, (newValue, oldValue) => {
    getItemsFunc()
})
getItemsFunc()
</script>