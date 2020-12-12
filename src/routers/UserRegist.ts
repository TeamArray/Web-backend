import { Request, Response, RequestHandler } from "express"
import sha256 from 'sha256'
import { CreateUser, ExistsUser } from "../database/Users"

/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { db: import('knex') }} res
 */
export default async function fn (req:Request, res:Response) {
  const { userid, userid: nicknm, passwd: pwraw } = req.body
  if (typeof userid !== 'string' || typeof pwraw !== 'string') return res.send({ success: false, message: 'not valid request' })
  if (userid.length <= 6) return res.send({ success: false, message: 'userid is too short' })
  if (userid.length > 15) return res.send({ success: false, message: 'userid is too long' })
  if (pwraw.length <= 9) return res.send({ success: false, message: 'passwd is too short' })
  if (pwraw.length > 30) return res.send({ success: false, message: 'passwd is too long' })

  if (await ExistsUser(userid)) return res.send({ success: false, message: 'userid aleady exist' })

  const pwsalt = gensalt()
  const passwd = sha256(pwsalt + pwraw)

  await CreateUser(userid, passwd, pwsalt, nicknm)
  res.send({ success: true, message: 'created account "' + userid  + '"' })
}

function gensalt () {
  let salt = ''
  for (let i = 0; i < 8; i++) {
    salt += i % 2 < 1
      ? String.fromCharCode(Math.floor(Math.random() * 106 - 8) + 21 + i)
      : String.fromCharCode(Math.floor(Math.random() * 169 - 8) + 697 + i)
  }
  return salt
}
