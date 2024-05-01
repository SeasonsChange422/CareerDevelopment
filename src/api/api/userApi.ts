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

export function updateUserInfo(param){
    return request({
        url: '/userApi/user/userInfo/update',
        method: 'put',
        params: param,
    })
}

export function addSchedule(param){
    return request({
        url: '/userApi/schedule',
        method: 'put',
        params: param,
    })
}

export function getSchedule(param) {
    return request({
        url: '/userApi/schedule',
        method: 'get',
        params: param
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
