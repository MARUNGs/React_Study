// Node.js 웹서버 설정
const express = require('express')
const app = express()
const path = require('path')

app.listen(7070, function() {
  console.log('PORT = 7070')
})

// ajax 통신시 필요
app.use(express.json())
var cors = require('cors')
app.use(cors())


// 해당 경로에 있는 static 파일들을 사용할 것이다.
app.use(express.static(path.join(__dirname, 'build_project/build')))

// 누가 내 react 프로젝트에 접근하면?
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'build_project/build/index.html'))
})

// DB 데이터 출력시,
// 1. DB 데이터 조회 후 보내주는 API 작성
// 2. React는 여기로 GET 요청
app.get('/product', function(request, response) {
  response.json({name: 'Test Name'})
})



// 이 소스는 가장 최하단에 작성할 것.
// react router로 설정하지 않은 모든 경로는 index.html을 바라보게 할 것
app.get('*', function(request, response) {
  response.sendFile(path.join(__dirname, 'build_project/build/index.html'))
})