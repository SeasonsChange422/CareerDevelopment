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

export function addCulturalPost(param) {
    const formData = new FormData()
    formData.append("title",param.title)
    formData.append("text",param.text)
    formData.append("id",param.id)
    formData.append("typeId",param.typeId)
    return request({
        url: '/userApi/cultural/add',
        method: 'post',
        data:formData,
        headers: {
            isAuth: 'true',
            needAdmin: 'true'
        }
    })
}

export function delCulturalPost(param) {
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

export function updateCulturalPost(param) {
    const formData = new FormData()
    formData.append("title",param.title)
    formData.append("text",param.text)
    formData.append("id",param.id)
    formData.append("typeId",param.typeId)
    return request({
        url: '/userApi/cultural/update',
        method: 'post',
        data: formData,
        headers: {
            isAuth: 'true',
            needAdmin: 'true'
        }
    })
}

export function listCulturalPost(param) {
    return request({
        url: '/userApi/cultural/list',
        method: 'get',
        params: param
    })
}