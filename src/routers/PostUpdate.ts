import { Request, Response, RequestHandler } from "express"

/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { db: import('knex'), token: string }} res
 */
export default async function fn (req:Request, res:Response) {
  const { user } = req
  const { boardid } = req.params
  const { title, content, isnotify = 0 } = req.body
  
  if (!title || !content) return res.send({ success: false, message: 'title or content is empty' })
  if (title.length > 50) return res.send({ success: false, message: 'title is too long' })
  if (content.length > 2000) return res.send({ success: false, message: 'content is too long' })
  if (isnotify && !user.ismebr) return res.send({ success: false, message: 'cannot create notify post, you\'re not a team member' })

  const [{ postid: latest }] = await res.db.select('postid').where('boardid', boardid).orderBy('postid').limit(1)

  await res.db.insert({ postid: latest + 1, title, author: user.userid, content, boardid, isnotify }).into('posts')
  res.send({ success: true, postid: latest + 1 })
}

module.exports = fn
