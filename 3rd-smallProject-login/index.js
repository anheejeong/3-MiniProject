const express = require('express')
const app = express()
const port = 3000
// npm package search : https://www.npmjs.com/package/package
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const { User } = require('./DBmodels/User')
const { auth } = require('./middleware/auth')

const config = require('./config/key')

// bodyParser로 들고온 정보를 서버에서 분석할 수 있게 함
// application/x-www-form-urlencoded 타입으로 된 것을 분석해서 가져오게 함
app.use(bodyParser.urlencoded({ extended: true }))
// application/json 타입으로 된 것을 들고 오게 함
app.use(bodyParser.json())
app.use(cookieParser())

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

/* 1 회원가입 */
// Body-Parser 필요(회원 가입 시 입력된 정보 받기 위함)
// npm install body-parser --save
app.post('/api/users/register', async (req, res) => {
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
    const result = await user.save()
        .then(() => {
            res.status(200).json({
                success: true
            })
        }).catch((err) => {
            res.json({ success: false, err })
        })
    // Postman => POST -> body -> raw -> JSON 에서 post 성공 유무 확인 가능
})

/* 2 로그인 */
app.post('/api/users/login', (req, res) => {
    // 1. 요청된 이메일을 db에서 찾음
    /* promise 형식으로 바꿔야 함 callback 형식 지원 x
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저 없음"
            })
        }
    })
    */
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.json({
                    loginSuccess: false,
                    message: "제공된 이메일에 해당하는 유저 없음"
                })
            }
            // 2. 요청된 이메일이 db에 있다면 비밀번호가 맞는지 확인
            user.comparePassword(req.body.password, (err, isMatch) => { // => User.js
                if (!isMatch) return res.json({
                    loginSuccess: false,
                    message: "비밀번호가 틀렸습니다."
                })
                // 3. 비밀번호가 맞다면 유저 토큰 생성
                // user id에 토큰 생성 -> Client는 Cookie에 token 저장, Server는 DB에 token 저장
                // Client Cookie token과 Server DB token을 계속 체크 필요 => auth route
                user.generateToken((err, user) => { // => User.js
                    // jsonwebtoken 라이브러리 다운
                    // npm install jsonwebtoken --save
                    if (err) return res.status(400).send(err)
                    // 토큰을 저장해서 보관해야 함 쿠키 또는 로컬스토리지
                    // cookie-parser 필요
                    // npm install cookie-parser --save
                    res.cookie("x_auth", user.token)
                        .status(200) // 성공했다는 표시
                        .json({ loginSuccess: true, userId: user._id })
                })
            })
        })
        .catch((err) => {
            return res.status(400).send(err)
        })

})

// auth route 필요
// 페이지 이동 때마다 로그인 되어있는지 안 되어있는지, 관리자 유저인지 등을 체크
// 글을 쓸 때나 지울 때 권한이 있는지 체크 등등
// 1. Cookie에서 저장된 Token을 Server에서 가져와서 복호화를 함
app.get('/api/users/auth', auth, (req, res) => { // middleware : auth, end point인 '/api/users/auth'에서 request를 받고 callback function 하기 전에 중간에서 하는 것
    // 여기까지 미들웨어를 통과해 왔다는 것은 Authentication이 true라는 뜻
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true, // role:0 -> 일반유저, role!=0 -> 관리자
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

// 로그아웃 route
// 토큰 지워줘야 함
app.get('/api/users/logout', auth, (req, res) => {
    /*
    User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).send({
            success: true
        })
    })
    */ // findOneAndUpdate callback 지원 x
    User.findOneAndUpdate({ _id: req.user.id }, { token: "" })
        .then(user => {
            return res.status(200).send({
                success: true
            })
        })
        .catch(err => {
            return res.json({ succss: false, err })
        })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})
//

