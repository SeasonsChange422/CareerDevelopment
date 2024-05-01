import request from '@/utils/request.ts'

export function addCareer(param) {
    const formData = new FormData()
    formData.append("id",param.id)
    formData.append("name",param.name)
    formData.append("description",param.description)
    formData.append("img",param.img)
    return request({
        url: '/userApi/admin/addCareer',
        method: 'post',
        data:formData
    })
}
export function delCareer(param) {
    return request({
        url: '/userApi/admin/delCareer',
        method: 'delete',
        params:param
    })
}

export function getCareer(param) {
    return request({
        url: '/userApi/admin/getCareer',
        method: 'get',
        params:param
    })
}

export function updateCareer(param) {
    const formData = new FormData()
    formData.append("id",param.id)
    formData.append("name",param.name)
    formData.append("description",param.description)
    formData.append("img",param.img)
    return request({
        url: '/userApi/admin/updateCareer',
        method: 'post',
        data:formData
    })
}


export function getCareerList(param) {
    return request({
        url: '/userApi/admin/listCareer',
        method: 'get',
        params:param
    })
}


export function addCareerQuizze(param) {
    return request({
        url: '/userApi/admin/addCareerQuiz',
        method: 'post',
        params:param
    })
}


export function delCareerQuiz(param) {
    return request({
        url: '/userApi/admin/delCareerQuiz',
        method: 'delete',
        params:param
    })
}


export function updateCareerQuiz(param) {
    return request({
        url: '/userApi/admin/updateCareerQuiz',
        method: 'post',
        params:param
    })
}

export function getCareerQuizList(param) {
    return request({
        url: '/userApi/admin/listCareerQuiz',
        method: 'get',
        params:param
    })
}