<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import ImageElement from '@wangeditor/editor';
import { useUserStore } from '@/stores/user.ts'
let props = defineProps<{
  editorContent: string,
  getContent: (html: string) => void,
  height: string,
}>()
const userStore = useUserStore()
const editor = ref<any>(null)
const toolbarConfig = {
  excludeKeys: [
    // "insertVideo",
    // "uploadVideo",
    // "editVideoSize",
    "fullScreen", "codeBlock", "todo", "|",
  ]
}
let html = ref(props.editorContent)

const editorConfig = {
  placeholder: '请输入内容...',
  autoFocus: true,
  scroll: true,
  MENU_CONF: {
    uploadImage: {
      server: '/api/userApi/img/upload',
      maxFileSize: 5 * 1024 * 1024,
      maxNumberOfFiles: 20,
      uploadImgFmSize: 300,
      fieldName: 'file',
      allowedFileTypes: ['image/*'],
      meta: {},
      metaWithUrl: false,
      headers: {
        uid: userStore.getUser().id, // Assuming VITE_APP_TOKEN is available in your environment variables
      },
      withCredentials: true,
      timeout: 10 * 1000,
      // onSuccess( ) {
      //   console.log(res);

      // },
      // onFailed(res:any) { //response格式不同，实际上这里是成功的
      //   console.log(res);
      // },
      // onError(file, err, res) {
      //   console.log(err,res);
      // },
      customInsert(res: any) {
        const node: ImageElement = {
          type: 'image',
          src: res.data,
          style: {
            width: '30%'
          },
          children: [{ text: '' }]
        }
        editor.value.insertNode(node)
      },
      // 单个文件上传失败
      onFailed() {   // TS 语法
        // onFailed(file, res) {           // JS 语法
      },

      // 上传错误，或者触发 timeout 超时
      onError() {  // TS 语法
        // onError(file, err, res) {               // JS 语法
      },
    },
    uploadVideo: {
      fieldName: 'file',
      server: '/api/userApi/img/upload',
      maxFileSize: 5 * 1024 * 1024, // 5M
      maxNumberOfFiles: 1,
      allowedFileTypes: ['video/*'],
      headers: {
        uid: userStore.getUser().id
      },
      timeout: 60 * 1000, // 15 秒
      customInsert(res: any) {
        const node: VideoElement = {
          type: 'video',
          src: res.data,
          style: {
            width: '80%'
          },
          children: [{ text: '' }]
        }
        editor.value.insertNode(node)
      },
    },
    color: {

    },
  }
};
const mode = 'default';

const onCreated = (createdEditor: any) => {
  editor.value = Object.seal(createdEditor);
  console.log(editor.value.getConfig());

  setInterval(() => {
    props.getContent(html.value)
  }, 2000);

};


onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy();
  }
});

</script>
<template>
  <div style="border-radius:10px;border:rgba(100,100,100) 1px solid;overflow-y: scroll;">
    <Toolbar style="border-bottom: 1px solid #ccc;width: 100%;z-index: 10;top: 0" :editor="editor"
      :defaultConfig="toolbarConfig" :mode="mode" />
    <Editor style="bottom: 30px;overflow-y: scroll;" v-model="html" :style="{ height: props.height }"
      :defaultConfig="editorConfig" :mode="mode" @onCreated="onCreated" />
  </div>
</template>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style scoped>
* {
  --w-e-textarea-bg-color: #fff;
  --w-e-textarea-color: #black;
}

:deep(.w-e-text-container) {
  /* background-color: transparent; */
  text-align: left;
}
</style>