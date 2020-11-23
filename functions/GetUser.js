const { verify } = require('jsonwebtoken')

/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { db: import('knex'), token: string }} res
 * @param {function} next
 */
await function fn (req, res, next) {
  const { authorization } = req.header

  if (!authorization) return res.send({ success: false, message: 'not authorized' })

  const [ type, token ] = authorization.split(' ')
  if (type !== 'Bearer') return res.send({ success: false, message: 'invalid authentication scheme' })

  const verified = verify(token, res.token)
  if (!verified) return res.send({ success: false, message: 'invalid authentication token' })

  const [user] = await res.db.select('*').where('userid', verified.userid).from('users')
  if (!user) return res.send({ success: false, message: 'user not exists' })

  req.user = user
  next()
}

module.exports = fn
