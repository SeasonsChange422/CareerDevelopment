<template>
    <v-data-table :headers="headers" :items="items" style="min-height: 100vh;">
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>帖子</v-toolbar-title>
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
        <template v-slot:item.title="{ value, index }">
            <v-text-field v-if="actionsIndex.editIndex == index" density="compact" style="transform: translate(0,20%);"
                v-model="updateItem.title" variant="outlined"></v-text-field>
            <div v-else>{{ value }}</div>
        </template>
        <template v-slot:item.content="{ value, index }">
            <v-text-field v-if="actionsIndex.editIndex == index" density="compact" style="transform: translate(0,20%);"
                v-model="updateItem.content" variant="outlined" @click="editContent(index)"></v-text-field>
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
    <v-dialog v-model="editDialog" width="auto">
        <editorComponent :editorContent="updateItem.content" :getContent="(html: string) => { updateItem.content = html }">
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
import { updatePost, getPost, addPost, listPost, delPost } from '@/api/api/adminApi.ts';
import { PostVo } from '@/api/type/userType.ts'
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
    { title: 'uid', key: 'uid' },
    { title: '标题', key: 'title' },
    { title: '内容', key: 'content' },
    // { title: '浏览量', key: 'watchNum' },
    // { title: '评论数', key: 'commentNum' },
    // { title: '点赞数', key: 'likeNum' },
    { title: '创建时间', key: 'createAt' },
    // { title: '是否已删除', key: 'hasDelete' },
    { title: 'Actions', key: 'actions', sortable: false },
]
const dialog = ref(false)
const editDialog = ref(false)
const updateItem = ref<PostVo>({
    commentNum: 0,
    content: '',
    createAt: '',
    hasDelete: '',
    id: '',
    likeNum: 0,
    title: '',
    uid: '',
    watchNum: 0,
})
const items = ref<PostVo[]>([]) // 用户列表
const actionsIndex = ref({ // 当前操作的数据在数组中的索引
    deleteIndex: -1, //删除
    editIndex: -1 //编辑
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
    updateItem.value.createAt = parseDate(new Date(parseDateString(updateItem.value.createAt)))
    updatePost(updateItem.value).then((res: any) => {
        if (res.code == 200) {
            message.value.success('更新成功')
            setTimeout(() => {
                router.go(0)
            }, 2000)
        }
    })
}
const getItemsFunc = function () {
    listPost(getListForm.value).then((res: any) => {
        if (res.code == 200) {
            items.value = res.data
        }
    })
}
const deleteItemFunc = function () {

    delPost({ id: items.value[actionsIndex.value.deleteIndex].id }).then((res: any) => {
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
const  parseDateString=function(dateString) {
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
</script>