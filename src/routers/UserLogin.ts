import { Request, Response, RequestHandler } from "express"
import sha256 from 'sha256'
import { sign } from 'jsonwebtoken'
import { GetUserByID } from "../database/Users"

/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { db: import('knex'), token: string }} res
 */
export default async function fn (req:Request, res:Response) {
  const { userid, passwd: pwraw } = req.body
  if (typeof userid !== 'string' || typeof pwraw !== 'string') return res.send({ success: false, message: 'not valid request' })

  const user = await GetUserByID(userid)
  if (!user) return res.send({ success: false, message: 'user not exists' })

  const { passwd, pwsalt } = user
  if (sha256(pwsalt + pwraw) !== passwd) return res.send({ success: false, message: 'password invalid' })
  res.send({ success: true, message: 'login success', token: sign({ userid }, res.locals.token) })
}
