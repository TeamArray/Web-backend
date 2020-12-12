import { Request, Response, RequestHandler } from "express"
import { CreateNewPost } from "../database/Posts"

const SECOND = 1000
const cooldown: Array<string> = []

/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { db: import('knex'), token: string }} res
 */
export default async function fn (req:Request, res:Response) {
  const { user } = req
  const { boardid } = req.params
  const { title, content, isnotify = 0 } = req.body

  if (cooldown.includes(user.userid)) return res.send({ success: false, message: 'cooldown enabled, please retry' })

  const coolindex = cooldown.push(user.userid)
  setTimeout(() => cooldown.splice(coolindex), 60 * SECOND)
  
  if (!title || !content) return res.send({ success: false, message: 'title or content is empty' })
  if (title.length > 50) return res.send({ success: false, message: 'title is too long' })
  if (content.length > 2000) return res.send({ success: false, message: 'content is too long' })
  if (isnotify && !user.ismebr) return res.send({ success: false, message: 'cannot create notify post, you\'re not a team member' })

  const CreatedPostID = await CreateNewPost(user, boardid, title, content, isnotify)
  if(CreatedPostID!){
    res.send({ success: true, postid: CreatedPostID })
  }else{
    res.send({ success: false, postid: -1 })
  }
  
}
