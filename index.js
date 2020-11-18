const cors = require('cors')
const express = require('express')
const knex = require('knex')

const { PORT = 8080, origin = '*\'', database } = require('./config.json')

const UserRegist = require('./routers/UserRegist')
const UserLogin = require('./routers/UserLogin')
const cryptoRandomString = require('crypto-random-string')

const db = knex(database)
const app = express()
const token = cryptoRandomString({ length: 30 })

app.use(cors({ origin }))
app.use((_, res, next) => { res.db = db; res.token = token; next() })

app.use('/api/regist', express.json())
app.post('/api/regist', UserRegist)

app.use('/api/login', express.json())
app.post('/api/login', UserLogin)

app.use((_, res) => res.send('oops, nothing to do here...<br /><img src="http://short.kro.kr/array"></img>'))
app.listen(PORT, () => console.log('Backend server is now on http://localhost:' + PORT))
