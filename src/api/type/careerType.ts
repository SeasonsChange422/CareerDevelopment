export type Career = {
    id: string;
    name: string;
    img: string;
    description: string;
}

export type CareerQuiz = {
    id: string;
    careerId: string;
    a:string;
    b:string;
    c:string;
    d:string;
    answer:string;
    question:string;
}