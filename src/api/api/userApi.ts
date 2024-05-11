/*
 * @Author: Dhx
 * @Date: 2024-04-28 13:25:56
 * @Description: 
 * @FilePath: \CareerDevelopment\src\api\api\userApi.ts
 */
import request from '@/utils/request'

// 登录接口
export function login(param) {
    return request({
        url: '/userApi/user/login',
        method: 'post',
        params: param
    })
}

// 注册接口
export function register(param) {
    return request({
        url: '/userApi/user/register',
        method: 'post',
        params: param
    })
}

// 
export function getUserInfo() {
    return request({
        url: '/userApi/user/userInfo',
        method: 'get',
        headers: {
            isAuth: 'true'
        }
    })
}

export function getUserInfoById(param) {
    return request({
        url: '/userApi/user/userInfo',
        method: 'get',
        headers: {
            isAuth: 'true',
            uid:param.id
        }
    })
}

export function updateUserInfo(param){
    return request({
        url: '/userApi/user/userInfo/update',
        method: 'put',
        params: param,
    })
}

export function addSchedule(param){
    return request({
        url: '/userApi/user/schedule',
        method: 'post',
        params: param,
    })
}

export function delSchedule(param){
    return request({
        url: '/userApi/user/schedule',
        method: 'delete',
        params: param,
    })
}

export function getSchedule(param) {
    return request({
        url: '/userApi/user/schedule',
        method: 'get',
        params: param
    })
}

export function updateSchedule(param) {
    return request({
        url: '/userApi/user/schedule',
        method: 'put',
        params:param
    })
}

export function uploadAvatar(param) {
    const formData = new FormData();
    formData.append('file',param);
    return request({
        url:'/userApi/img/upload',
        method: 'post',
        data: formData,
        headers: {
            id: 1,
            isAuth: true
        }
    })
}

export function getFriends() {
    return request({
        url: '/userApi/user/friends',
        method: 'get',
    })
}