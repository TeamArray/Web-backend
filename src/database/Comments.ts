import { Database } from "../index"
import CommentModel from "../models/CommentModel"

export function GetCommentBySelection(limit:number, page:number) {
    return new Promise(async (resolve: (Comment: Array<CommentModel> | undefined) => void, reject) => {
        const comments = await Database.select('*')
        .where('postsid').limit(limit)
        .offset(limit * page - limit).from('comments')
        
        resolve(comments)
    })
}