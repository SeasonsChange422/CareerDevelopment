/*
 * @Author: Dhx
 * @Date: 2024-04-28 12:52:53
 * @Description: 
 * @FilePath: \CareerDevelopment\src\utils\request.ts
 */
import axios from 'axios'
import router from '../router'
import {useUserStore} from '@/stores/user.ts'
const request = axios.create({
    baseURL: '/api',
    timeout: 60000,
})

let userStore = null as any


request.interceptors.request.use(config => {
    if(userStore==null)userStore= useUserStore()
    if (config.headers.isAuth == 'true') { // 未登录遇到需要登录的接口跳转到登录页
        if (!userStore.getUser().id) {
            router.push('/')
            return Promise.reject()
        }
    }
    if (config.headers.needAdmin == 'true'){
        if (userStore.getUser().isAdmin == 0){
            router.push('/')
            return Promise.reject()
        }
    }
    if(userStore.getUser().id) {
        config.headers.uid = userStore.getUser().id
    }

    return config
}, (error) => Promise.reject(error))

request.interceptors.response.use(response => {
    const res = response.data
    if (res.code == '400' ) {
        return Promise.reject()
    }
    if(res.msg == '用户未登录'){
        router.push('/')
    }
    // 如果接口正常，直接返回数据

    return res
}, (error) => {
    if (error.name == 'Error') {
        // useMessage().error(error.msg)
    } else {
        // useMessage().error(error.response.data.data || error.message)
    }

    return Promise.reject(error)
})

export default request