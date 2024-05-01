import request from "@/utils/request"

export function addCulturalType(param){
    return request({
        url: '/userApi/cultural/type/add',
        method: 'post',
        params:param,
        headers: {
            isAuth: 'true',
            needAdmin: 'true'
        }
    })
}

export function delCulturalType(param) {
    return request({
        url: '/userApi/cultural/type/del',
        method: 'delete',
        params: param,
        headers: {
            isAuth: 'true',
            needAdmin: 'true'
        }
    })
}

export function getCulturalTypeById(param) {
    return request({
        url: '/userApi/cultural/type/get',
        method: 'get',
        params: param
    })
}

export function updateCulturalType(param) {
    return request({
        url: '/userApi/cultural/type/update',
        method: 'post',
        params: param,
        headers: {
            isAuth: 'true',
            needAdmin: 'true'
        }
    })
}

export function getCulturalTypeList() {
    return request({
        url: '/userApi/cultural/type/list',
        method: 'get',
    })
}

export function addCultural(param) {
    return request({
        url: '/userApi/cultural/add',
        method: 'post',
        params:param,
        headers: {
            isAuth: 'true',
            needAdmin: 'true'
        }
    })
}

export function delCultural(param) {
    return request({
        url: '/userApi/cultural/del',
        method: 'delete',
        params: param,
        headers: {
            isAuth: 'true',
            needAdmin: 'true'
        }
    })
}

export function getCulturalById(param) {
    return request({
        url: '/userApi/cultural/get',
        method: 'get',
        params: param
    })
}

export function updateCultural(param) {
    return request({
        url: '/userApi/cultural/update',
        method: 'post',
        param: param,
        headers: {
            isAuth: 'true',
            needAdmin: 'true'
        }
    })
}

export function getCulturalList(param) {
    return request({
        url: '/userApi/cultural/list',
        method: 'get',
        params: param
    })
}