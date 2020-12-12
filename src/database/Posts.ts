import { Database } from ".."
import PostModel from "../models/PostModel"
import UserModel from "../models/UserModel"

/**
 * 포스트를 생성합니다
 * @return {number} 생성된 포스트 ID 
 */
export function CreateNewPost(User: UserModel, boardid: string, title: string, content: string, isnotify: boolean = false) {
    return new Promise(async (resolve: (PostID: number | undefined) => void, reject) => {
        const [{ postid: latest }] = await Database.select('postid').where('boardid', boardid).orderBy('postid').limit(1)
        await Database.insert({ postid: latest + 1, title, author: User.userid, content, boardid, isnotify }).into('posts')
        resolve(latest + 1)
    })
}

/**
 * 포스트를 수정합니다
 * @return {number} 생성된 포스트 ID 
 */
export function UpdatePost(User: UserModel, boardid: string, title: string, content: string, isnotify: boolean = false) {
    return new Promise(async (resolve: (PostID: number | undefined) => void, reject) => {
        const [{ postid: latest }] = await Database.select('postid').where('boardid', boardid).orderBy('postid').limit(1)
        await Database.insert({ postid: latest + 1, title, author: User.userid, content, boardid, isnotify }).into('posts')
        resolve(latest + 1)
    })
}

/**
 * 최근 포스트들을 가져옵니다
 * @return {Array<PostModel>} 포스트 목록
 */
export function GetPostsBySelection(limit: number, page: number, boardID: number) {
    return new Promise(async (resolve: (Comment: Array<PostModel> | undefined) => void, reject) => {
        const data = await Database.select('*')
            .where('boardid', boardID).orderBy('createdAt')
            .limit(limit).offset(limit * page - limit).from('posts')

        resolve(data)
    })
}

/**
 * 최근 포스트들을 가져옵니다
 * @return {Array<PostModel>} 포스트 목록
 */
export function GetPostByID(boardID: number, postID: number) {
    return new Promise(async (resolve: (Comment: Array<PostModel> | undefined) => void, reject) => {
        const [data] = await Database.select('*')
            .where('boardid', boardID).andWhere('postid', postID)
            .limit(1).from('posts')
        resolve(data)
    })
}