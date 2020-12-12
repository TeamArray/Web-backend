import { Request, Response, RequestHandler } from "express"
import { verify } from 'jsonwebtoken'
import { GetUserByID } from "../database/Users"
import TokenPayload from "../models/TokenPayload"

/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { db: import('knex'), token: string }} res
 * @param {function} next
 */
export default async function fn (req:Request, res:Response, next:() => void) {
  const { authorization } = req.header as any

  if (!authorization) return res.send({ success: false, message: 'not authorized' })

  const [ type, token ] = authorization.split(' ')
  if (type !== 'Bearer') return res.send({ success: false, message: 'invalid authentication scheme' })

  const verified:TokenPayload = verify(token, res.locals.token) as TokenPayload
  if (!verified) return res.send({ success: false, message: 'invalid authentication token' })

  const user = await GetUserByID(verified.userid)
  if (!user) return res.send({ success: false, message: 'user not exists' })

  req.user = user
  next()
}
