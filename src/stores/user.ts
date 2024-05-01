/*
 * @Author: Dhx
 * @Date: 2024-04-27 19:40:45
 * @Description: 
 * @FilePath: \CareerDevelopment\src\stores\user.ts
 */
import { defineStore } from 'pinia'
import { UserInfo } from '@/api/type/userType.ts'
import { getUserById } from '@/api/api/adminApi.ts'
export const useUserStore = defineStore('app', {
  state: () => ({
    userInfo: {
      age: 0,
      birth: '',
      education: '',
      id: '',
      img: '',
      introduction: '',
      isAdmin: 0,
      password: '',
      sex: 0,
      username: '',
    } as UserInfo,
    userMap: [

    ]
  }),
  getters: {
  },
  actions: {
    setUser(userInfo: UserInfo) {
      this.userInfo = userInfo
    },
    clearUser() {
      this.userInfo = {
        age: null,
        birth: null,
        education: null,
        id: null,
        img: null,
        introduction: null,
        isAdmin: 0,
        password: null,
        sex: 0,
        username: '',
      }
    },
    getUser() {
      return this.userInfo
    },
    setUserById(user) {
      this.userMap[user.id] = user
      let tmp = this.userMap
      this.userMap = []
      this.userMap = tmp
    },
    deleteUser(uid) {
      delete this.userMap[uid]
    },
    async getUserByIdFunc(uid) {
      if (this.userMap[uid]) return this.userMap[uid]
      else {
        const res = await getUserById({ id: uid });
        if (res.code === 200) {
          this.setUserById(res.data)
          return res.data;
        }
      }
    }
  },
  persist: {
    enabled: true,
  }
})
