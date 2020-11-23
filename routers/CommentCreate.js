const { verify } = require('jsonwebtoken')
const cryptoRandomString = require('crypto-random-string')

/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { db: import('knex'), token: string }} res
 */
async function fn (req, res) {
  const { user } = req
  const { postsid } = req.params
  const { content } = req.body

  if (!postsid ||!content) return res.send({ success: false, message: 'postid or content is empty' })
  if (content.length > 280) return res.send({ success: false, message: 'content is too long' })
  if (content.length === 0) return res.send({ success: false, message: 'content is too short' })

  const data = await res.db.insert({ postid })
  res.send({ success: true, data })
}

module.exports = fn
