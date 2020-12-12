import { Request, Response, RequestHandler } from "express"
import { verify } from 'jsonwebtoken'
import cryptoRandomString from 'crypto-random-string'
import { CreateNewComment } from "../database/Comments"

/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { db: import('knex'), token: string }} res
 */
export default async function fn (req:Request, res:Response) {
  const { user } = req
  const { postsid } = req.params
  const { content } = req.body

  if (!postsid ||!content) return res.send({ success: false, message: 'postid or content is empty' })
  if (content.length > 280) return res.send({ success: false, message: 'content is too long' })
  if (content.length === 0) return res.send({ success: false, message: 'content is too short' })

  const data = await CreateNewComment(postsid)
  res.send({ success: true, data })
}