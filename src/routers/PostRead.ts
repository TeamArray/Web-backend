import { Request, Response, RequestHandler } from "express"
import { GetPostByID } from "../database/Posts"

/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { db: import('knex'), token: string }} res
 */
export default async function fn (req:Request, res:Response) {
  const boardid = parseInt(req.params.boardid)
  const postid = parseInt(req.params.postid)
  
  const data = await GetPostByID(boardid, postid)

  if (!data) res.send({ success: false, message: 'post not found' })
  res.send({ success: true, data })
}
