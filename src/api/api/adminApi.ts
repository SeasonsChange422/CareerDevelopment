/*
 * @Author: Dhx
 * @Date: 2024-04-29 16:14:23
 * @Description: 
 * @FilePath: \CareerDevelopment\src\api\api\adminApi.ts
 */
//
import request from '@/utils/request.ts'
import {UserInfo,delUserForm,getUserForm,getUserListForm} from '@/api/type/userType.ts'
export function addUser(param:UserInfo){
    return request({
        url: '/userApi/admin/addUser',
        method: 'post',
        params:param
    })
}

export function delUser(param:delUserForm){
    return request({
        url: '/userApi/admin/delUser',
        method: 'delete',
        params:param
    }) 
}

export function getUserById(param:getUserForm) {
    return request({
        url: '/userApi/admin/getUser',
        method: 'get',
        params:param
    })
}

export function updateUser(param:UserInfo){
    return request({
        url: '/userApi/admin/updateUser',
        method: 'post',
        params:param
    })
}

export function getUserList(param:getUserListForm) {
    return request({
        url: '/userApi/admin/listUser',
        method: 'get',
        params:param
    })
}

export function addPost(param) {
    return request({
        url: '/userApi/admin/addPost',
        method: 'post',
        params:param
    })
}

export function delPost(param) {
    return request({
        url: '/userApi/admin/delPost',
        method: 'delete',
        params:param
    })
}

export function getPost(param) {
    return request({
        url: '/userApi/admin/getPost',
        method: 'get',
        params:param
    })
}

export function updatePost(param) {
    return request({
        url: '/userApi/admin/updatePost',
        method: 'post',
        params:param
    })
}

export function listPost(param) {
    return request({
        url: '/userApi/admin/listPost',
        method: 'get',
        params:param
    })
}
