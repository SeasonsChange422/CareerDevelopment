import request from '@/utils/request.ts'
export function chatList(param) {
    return request({
        url: '/userApi/chat/list',
        method: 'get',
        params: param
    })
}

export function addChat(param) {
    return request({
        url: '/userApi/chat/add',
        method: 'post',
        data: param
    })
}