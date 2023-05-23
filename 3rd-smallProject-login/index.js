const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

const { User } = require('./DBmodels/User')

const config = require('./config/key')

// bodyParser로 들고온 정보를 서버에서 분석할 수 있게 함
// application/x-www-form-urlencoded 타입으로 된 것을 분석해서 가져오게 함
app.use(bodyParser.urlencoded({ extended: true }))
// application/json 타입으로 된 것을 들고 오게 함
app.use(bodyParser.json())

const mongoose = require('mongoose')
// mongoDB cluster 연결
// cluster : login-learning
// SSH 연결 : https://docs.github.com/ko/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account
// DB 연결 시 현재 IP 등록 필요
// private => 깃허브 업로드에서 제외 필요
mongoose.connect(config.mongoURI, {
    //useNewUrlParser: true, userUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Body-Parser 필요(회원 가입 시 입력된 정보 받기 위함)
// npm install body-parser --save
app.post('/register', async (req, res) => {
    // 회원 가입 할 때 필요한 정보들을 client에서 가져오면
    // 그것들을 db에 넣어줌
    const user = new User(req.body)
    //mongoDB에 저장
    /* Mongoose6부터 callback 문법 적용 x
    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
    */
    // async - await로 변경 필요
    const result = await user.save().then(() => {
        res.status(200).json({
            success: true
        })
    }).catch((err) => {
        res.json({ success: false, err })
    })
    // Postman => POST -> body -> raw -> JSON 에서 post 성공 유무 확인 가능
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})
//

