const sha256 = require('sha256')

/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { db: import('knex') }} res
 */
async function fn (req, res) {
  const { userid, userid: nicknm, passwd: pwraw } = req.body
  if (typeof userid !== 'string' || typeof pwraw !== 'string') return res.send({ success: false, message: 'not valid request' })
  if (userid.length <= 6) return res.send({ success: false, message: 'userid is too short' })
  if (userid.length > 15) return res.send({ success: false, message: 'userid is too long' })
  if (pwraw.length <= 9) return res.send({ success: false, message: 'passwd is too short' })
  if (pwraw.length > 30) return res.send({ success: false, message: 'passwd is too long' })

  const [data] = await res.db.select('*').where({ userid }).from('users')
  if (data) return res.send({ success: false, message: 'userid aleady exist' })

  const pwsalt = gensalt()
  const passwd = sha256(pwsalt + pwraw)

  await res.db.insert({ userid, passwd, pwsalt, nicknm }).into('users')
  res.send({ success: true, message: 'created account "' + userid  + '"' })
}

module.exports = fn

function gensalt () {
  let salt = ''
  for (let i = 0; i < 8; i++) {
    salt += i % 2 < 1
      ? String.fromCharCode(Math.floor(Math.random() * 106 - 8) + 21 + i)
      : String.fromCharCode(Math.floor(Math.random() * 169 - 8) + 697 + i)
  }
  return salt
}
