/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { db: import('knex'), token: string }} res
 */
async function fn (req, res) {
  const { commentid } = req.query
  const { limit = 30, page = 0 } = req.query

  const data = res.db.select('*')
    .where('postsid').limit(limit)
    .offset(limit * page - limit).from('comments')
  
    res.send({ success:true, data })
}

// 뭐 더이상 건들게 없네

module.exports = fn
