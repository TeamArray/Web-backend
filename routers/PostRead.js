/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { db: import('knex'), token: string }} res
 */
async function fn (req, res) {
  const { boardid, postid } = req.params
  
  const [data] = await res.db.select('*')
    .where('boardid', boardid).andWhere('postid', postid)
    .limit(1).from('posts')

  if (!data) res.send({ success: false, message: 'post not found' })
  res.send({ success: true, data })
}

module.exports = fn
