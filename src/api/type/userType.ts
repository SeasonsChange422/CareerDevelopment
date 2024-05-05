/*
 * @Author: Dhx
 * @Date: 2024-04-27 19:41:40
 * @Description: 
 * @FilePath: \CareerDevelopment\src\api\type\userType.ts
 */
type UserInfo = {
    age: number
    birth: string
    education: string
    id: string
    img: string
    introduction: string
    isAdmin: number
    password: string
    sex: number
    username: string
}



type delUserForm = {
    id:string;
}

type getUserForm = {
    id:string;
}

type getUserListForm = {
    page:number;
    limit:number;
}

type Schedule = {
    id:string;
    time:string;
    schedult:string;
    notes:string;
    status:string;
}