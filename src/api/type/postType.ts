/*
 * @Author: Dhx
 * @Date: 2024-04-28 16:35:53
 * @Description: 
 * @FilePath: \CareerDevelopment\src\api\type\postType.ts
 */
import { UserInfo } from '@/api/type/userType.ts'
export type CommentVo = {
    postCommentId: string
    content: string
    postId: string
    rootCommentId: string
    user: UserInfo 
    replayUser: UserInfo
    childrenComment: CommentVo[] | undefined
}
export type CommentChildrenListForm = {
    data: string;
    limit: string;
    page: string;
    [property: string]: any;
}

export type GetCommentListForm = {
    data?: string;
    limit?: string;
    page?: string;
    [property: string]: any;
}

export type CommentForm = {
    /**
     * 内容
     */
    content: string;
    /**
     * 所属帖子id
     */
    postId: string | undefined;
    /**
     * 顶级评论id
     */
    rootCommentId: string | undefined;
    /**
     * 回复目标评论id
     */
    toCommentId: string | undefined;
    /**
     * 回复目标用户id
     */
    toUserId: string | undefined | null;
    [property: string]: any;
}

export type PostListForm = {
    data: string | undefined
    page: string
    limit: string
}

export type PostVo = {
    commentNum: number
    content: string
    createAt:string
    hasDelete:string
    id: string
    likeNum:number
    title:string
    uid:string
    watchNum:number
}