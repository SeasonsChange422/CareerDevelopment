/*
 * @Author: Dhx
 * @Date: 2024-05-01 02:20:19
 * @Description: 
 * @FilePath: \CareerDevelopment\src\api\api\psychologicalApi.ts
 */
import request from '@/utils/request.ts'

export function addPsychological(param) {
    const formData = new FormData()
    formData.append("id",param.id)
    formData.append("name",param.name)
    formData.append("description",param.description)
    formData.append("img",param.img)
    return request({
        url: '/userApi/admin/addPsychological',
        method: 'post',
        data:formData
    })
}
export function delPsychological(param) {
    return request({
        url: '/userApi/admin/delPsychological',
        method: 'delete',
        params:param
    })
}

export function getPsychological(param) {
    return request({
        url: '/userApi/admin/getPsychological',
        method: 'get',
        params:param
    })
}

export function updatePsychological(param) {
    const formData = new FormData()
    formData.append("id",param.id)
    formData.append("name",param.name)
    formData.append("description",param.description)
    formData.append("img",param.img)
    return request({
        url: '/userApi/admin/updatePsychological',
        method: 'post',
        data:formData
    })
}


export function getPsychologicalList(param) {
    return request({
        url: '/userApi/admin/listPsychological',
        method: 'get',
        params:param
    })
}

export function addPsychologicalTest(param) {
    return request({
        url: '/userApi/admin/addPsychologicalTest',
        method: 'post',
        params:param
    })
}


export function delPsychologicalTest(param) {
    return request({
        url: '/userApi/admin/delPsychologicalTest',
        method: 'delete',
        params:param
    })
}


export function updatePsychologicalTest(param) {
    return request({
        url: '/userApi/admin/updatePsychologicalTest',
        method: 'post',
        params:param
    })
}

export function getPsychologicalTestList(param) {
    return request({
        url: '/userApi/admin/listPsychologicalTest',
        method: 'get',
        params:param
    })
}

export function getRandomPsychologicalTest(param){
    return request({
        url: '/userApi/admin/randomListPsychologicalTest',
        method: 'get',
        params:param
    })
}