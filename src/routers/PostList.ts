import { Request, Response, RequestHandler } from "express"

/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { db: import('knex'), token: string }} res
 */
export default async function fn (req:Request, res:Response) {
  const { boardid } = req.params
  const { limit = 30, page = 0 } = req.query

  const data = await res.db.select('*')
    .where('boardid', boardid).orderBy('createdAt')
    .limit(limit).offset(limit * page - limit).from('posts')

  res.send({ success: true, data })
}

module.exports = fn
