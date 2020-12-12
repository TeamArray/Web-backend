import { Request, Response, RequestHandler } from "express"

/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { db: import('knex'), token: string }} res
 */
export default async function fn (req:Request, res:Response) {
  const { boardid, postid } = req.params
  
  const [data] = await res.db.select('*')
    .where('boardid', boardid).andWhere('postid', postid)
    .limit(1).from('posts')

  if (!data) res.send({ success: false, message: 'post not found' })
  res.send({ success: true, data })
}

module.exports = fn
