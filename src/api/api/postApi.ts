/*
 * @Author: Dhx
 * @Date: 2024-04-28 16:33:36
 * @Description: 
 * @FilePath: \CareerDevelopment\src\api\api\postApi.ts
 */
import request from '@/utils/request.ts'
import {PostListForm,CommentForm} from '@/api/type/postType.ts'
export function addPost(param){
    const formData = new FormData()
    formData.append("title",param.title)
    formData.append("content",param.content)
    return request({
        url: '/userApi/post/add',
        method: 'post',
        data: formData,
        headers: {
            isAuth: 'true',
        }
    })
}

export function addpostComment(param){
    return request({
        url:'/userApi/post/comment',
        method: 'post',
        params: param,
        headers: {
            isAuth: 'true',
        }
    })
}

export function getPostById(param) {
    return request({
        url: '/userApi/post/get',
        method: 'get',
        params:param,
    })
}

export function getCommentList(param){
    return request({
        url: '/userApi/post/commentlist',
        method: 'get',
        params: param
    })
}

export function getChildrenCommentList(param) {
    return request({
        url: '/userApi/post/childrenList',
        method: 'get',
        params: param
    })
}
export function getPostList(form:PostListForm){
    return request({
        method:'get',
        url:'/userApi/admin/listPost',
        params:form
    })
}


export function commentAdd(form:CommentForm){
    return request({
        method:'post',
        url:'/userApi/post/comment',
        params:form,
        headers:{
            isAuth:true
        }
    })
}