import { Request, Response, RequestHandler } from "express"
import { GetPostsBySelection } from "../database/Posts"

/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { db: import('knex'), token: string }} res
 */
export default async function fn (req:Request, res:Response) {
  const { boardid } = req.params
  const limit = parseInt(req.query.limit as string || "30")
  const page = parseInt(req.query.page as string || "0")

  const data = await GetPostsBySelection(limit, page, parseInt(boardid))
  res.send({ success: true, data })
}
