/*
 * @Author: Dhx
 * @Date: 2024-05-01 02:20:25
 * @Description: 
 * @FilePath: \CareerDevelopment\src\api\type\psychologicalType.ts
 */
export type PsychologicalType = {
    id: string;
    name: string;
    img: string;
    description: string;
}

export type PsychologicalTest = {
    id: string;
    tr: string;
    fa: string;
    question:string;
    answer:string;
    psychologiclId:string;
}