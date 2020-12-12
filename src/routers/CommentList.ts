import { Request, Response, RequestHandler } from "express"
import { GetCommentBySelection } from "../database/Comments"

/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { db: import('knex'), token: string }} res
 */
export default async function fn(req: Request, res: Response) {
  const { commentid } = req.query
  const limit = parseInt(req.query.limit as string || "30")
  const page = parseInt(req.query.page as string || "0")

  const data = await GetCommentBySelection(limit, page)
  res.send({ success: true, data })
}
