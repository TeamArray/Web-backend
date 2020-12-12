import express from "express"
import cors from "cors"
import knex from "knex"
import cryptoRandomString from 'crypto-random-string'

const { PORT = 8080, database } = require('./config.json')

import PostList from './routers/PostList'
import PostRead from './routers/PostRead'
import PostCreate from './routers/PostCreate'
import PostUpdate from './routers/PostUpdate'
// import CommentList from './routes/CommentList'
// import CommentCreate from './routes/CommentCreate'
import GetUser from './functions/GetUser'
import UserLogin from './routers/UserLogin'
import UserRegist from './routers/UserRegist'

//Export Database
export const Database = knex(database)

const App = express()
const Token = cryptoRandomString({ length: 30 })

App.use(cors)
App.use((req, res, next) => { res.locals.token = Token; next() })

App.use('/api/login', express.json())
App.post('/api/login', UserLogin)

App.use('/api/regist', express.json())
App.post('/api/regist', UserRegist)

App.use('/api/board', express.json())
App.get('/api/board/:boardid', PostList) // 게시판 글 목록
App.get('/api/board/:boardid/:postid', PostRead) // 게시판 글 내용


App.use('/api/comment', express.json())
App.get('/api/comment/:id') // 게시판 댓글 목록

App.use(GetUser)

// -- 인증 필요한거

App.post('/api/board/:boardid', PostCreate) // 게시판 글 작성
App.put('/api/board/:boardid/:postid', PostUpdate) // 게시판 글 수정
App.delete('/api/board/:boardid/:postid') // 게시판 글 삭제
App.post('/api/comment/:id') // 댓글 내용 작성
App.put('/api/comment/:id') // 댓글 내용 수정

App.delete('/api/comment/:id') // 댓글 내용 삭제

App.use((_, res) => res.send('oops, nothing to do here...<br /><img src="http://short.kro.kr/array"></img>'))
App.listen(PORT, () => console.log('Backend server is now on http://localhost:' + PORT))
