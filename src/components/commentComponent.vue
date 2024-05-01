<script setup lang="ts">
import { ref } from 'vue';
import { CommentVo, CommentForm } from '@/api/api/postType'
import { commentAdd } from '@/api/api/postApi'
import { useUserStore } from '@/stores/user.ts'
const userStore = useUserStore()
let props = defineProps<{
  comment: CommentVo,
  showReply: (index: number) => boolean,
  index: number
}
>()
const emit = defineEmits(["pushComment"]);

let currentComment = ref<CommentVo>(props.comment)
let commentStyle = ref(props.comment.rootCommentId == '-1' ? 'root-comment' : 'child-comment');
let showReplyText = ref('查看回复')
let inputVisibility = ref(false)
let inputContent = ref('')
const input = ref<any>(null)
const handleReply = function () {
  // if (!storage.get<string>('token')) {
  //   // message.error('未登录')
  //   return
  // }
  inputVisibility.value = true
  setTimeout(function () { input!.value!.focus() }, 500)
}
const handleBlur = function () {
  setTimeout(function () { inputVisibility.value = false }, 100)
}

const sendComment = function () {
  let form = ref<CommentForm>({
    content: inputContent.value,
    postId: currentComment.value.postId,
    rootCommentId: currentComment.value.rootCommentId == '-1' ? currentComment.value.postCommentId : currentComment.value.rootCommentId,
    toCommentId: currentComment.value.rootCommentId == '-1' ? '' : currentComment.value.postCommentId,
    toUserId: currentComment.value.rootCommentId == '-1' ? '' : currentComment.value.user?.id
  })
  commentAdd(form.value).then((res: any) => {
    if (res.code == 200) {
      // message.success('发送成功')
      pushComment(form.value, res.data)
    } else {
      // message.error(res.msg)
    }
    inputContent.value = ""

  })
}
const pushComment = function (form: CommentForm, postCommentId: string) {
  let newComment = ref<CommentVo>({
    postCommentId: postCommentId,
    content: form.content,
    postId: form.postId!,
    rootCommentId: form.rootCommentId!,
    toUserId: form.toUserId!,
    user: userStore.getUser(),
    replayUser: currentComment.value.rootCommentId == '-1' ? null : currentComment.value.user,
    childrenComment: undefined,
  })
  emit('pushComment', newComment.value)
  // currentComment = ref<CommentVo>(props.comment)

}

let clickMore = ref(false)
let moreVisibility = ref(false)
const handleClickMore = function () {
  clickMore.value = true
  moreVisibility.value = !moreVisibility.value
  setTimeout(function () {
    clickMore.value = false
  }, 200)
}
const handleBlur2 = function () {
  setTimeout(function () {
    moreVisibility.value = false
  }, 200)
}
</script>
<template>
  <div style="width: 100%;position: relative;display: flex;justify-content: right;">
    <div :class="commentStyle">
      <div class="comment-left">
          <div class="avatar-border">
            <img height="40" width="40" style="object-fit: cover;overflow: hidden;" :src="currentComment?.user?.img!"
              alt="commenter-avatar">
          </div>
      </div>
      <div class="comment-right">
          <div class="commenter-nickName">
            {{ currentComment?.user?.username }}
          </div>

        <div class="comment-content">
          <span
            style="display: inline-block;background-color: rgba(102,102,102,0.2);height: 80%;border-radius: 5px;font-family: 'ZCool';">
            {{ currentComment?.replayUser ? '@' + currentComment?.replayUser?.username : '' }}
          </span>
          <span>
            {{ currentComment?.content }}
          </span>
        </div>
        <div class="comment-status">
          {{ currentComment?.createAt }}
          <span style="cursor: pointer;font-family: 'ZCool';" @click="handleReply">
            回复
          </span>
          <span style="margin-left: 20px;cursor: pointer;font-family: 'ZCool';"
            @click="showReplyText = showReply(index) ? '收起' : '查看回复'"
            v-show="currentComment.rootCommentId == '-1' ? true : false">
            {{ showReplyText }}
          </span>
        </div>
        <div v-show="inputVisibility" class="reply">
          <span style="font-family: 'ZCool';">@{{ currentComment.user?.usernmae }}:</span>
          <input class="input" placeholder="" v-model="inputContent" @blur="handleBlur" ref="input">
          <div style="width: 30px;height: 30px;">
            <!-- <recordingComponnent :getUrl="getUrl"></recordingComponnent> -->
          </div>
          <button :style="{ cursor: inputContent != '' ? 'pointer' : 'not-allowed' }" style="font-family: 'ZCool';"
            @click="sendComment()">发送</button>
        </div>
      </div>
      <div>
        <div tabindex="-1" class="more" @click="handleClickMore" @blur="handleBlur2"
          :class="clickMore ? 'dither-animation' : ''" style="z-index: 10;">
          <div
            style="height: 16px;width:16px;background-image: url('/icon/more.svg');background-repeat: no-repeat;background-position: center center;background-size: contain;">
          </div>
        </div>
      </div>
      <div class="more-window" v-show="moreVisibility">
        <!-- <div class="more-window__item" @click="message.warning('开发中')">
          举报
        </div> -->
      </div>
    </div>
  </div>
</template>
<style scoped>
@import "@/assets/style/comment.css";
</style>