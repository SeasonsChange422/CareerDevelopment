/*
 * @Author: Dhx
 * @Date: 2024-04-29 01:18:08
 * @Description: 
 * @FilePath: \CareerDevelopment\src\api\type\culturalType.ts
 */
export type CulturalType = {
    id: string;
    name: string;
    img:string;
}

export type CulturalPost = {
    id:string;
    typeId: string;
    title: string;
    text: string;
}