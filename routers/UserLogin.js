const sha256 = require('sha256')
const { sign } = require('jsonwebtoken')

/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { db: import('knex'), token: string }} res
 */
async function fn (req, res) {
  const { userid, passwd: pwraw } = req.body
  if (typeof userid !== 'string' || typeof pwraw !== 'string') return res.send({ success: false, message: 'not valid request' })

  const [user] = await res.db.select('*').where({ userid }).from('users')
  if (!user) return res.send({ success: false, message: 'user not exists' })

  const { passwd, pwsalt } = user
  if (sha256(pwsalt + pwraw) !== passwd) return res.send({ success: false, message: 'password invalid' })
  res.send({ success: true, message: 'login success', token: sign({ userid }, res.token) })
}

module.exports = fn
