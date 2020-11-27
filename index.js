const cors = require('cors')
const express = require('express')
const knex = require('knex')

const { PORT = 8080, database } = require('./config.json')

const PostList = require('./routers/PostList')
const PostRead = require('./routers/PostRead')
const PostCreate = require('./routers/PostCreate')
const PostUpdate = require('./routers/PostUpdate')
// const CommentList = require('./routes/CommentList')
// const CommentCreate = require('./routes/CommentCreate')
const GetUser = require('./functions/GetUser')
const UserLogin = require('./routers/UserLogin')
const UserRegist = require('./routers/UserRegist')
const cryptoRandomString = require('crypto-random-string')

const db = knex(database)
const app = express()
const token = cryptoRandomString({ length: 30 })

app.use(cors())
app.use((_, res, next) => { res.db = db; res.token = token; next() })

app.use('/api/login', express.json())
app.post('/api/login', UserLogin)

app.use('/api/regist', express.json())
app.post('/api/regist', UserRegist)

app.use('/api/board', express.json())
app.get('/api/board/:boardid', PostList) // 게시판 글 목록
app.get('/api/board/:boardid/:postid', PostRead) // 게시판 글 내용


app.use('/api/comment', express.json())
app.get('/api/comment/:id') // 게시판 댓글 목록

app.use(GetUser)

// -- 인증 필요한거

app.post('/api/board/:boardid', PostCreate) // 게시판 글 작성
app.put('/api/board/:boardid/:postid', PostUpdate) // 게시판 글 수정
app.delete('/api/board/:boardid/:postid') // 게시판 글 삭제
app.post('/api/comment/:id') // 댓글 내용 작성
app.put('/api/comment/:id') // 댓글 내용 수정

app.delete('/api/comment/:id') // 댓글 내용 삭제

app.use((_, res) => res.send('oops, nothing to do here...<br /><img src="http://short.kro.kr/array"></img>'))
app.listen(PORT, () => console.log('Backend server is now on http://localhost:' + PORT))
