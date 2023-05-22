const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true  // 스페이스 없애줌
    },
    password: {
        type: String,
        maxlength: 50
    },
    role: { // 관리자 확인
        type: Number,
        default: 0
    },
    image: String,
    token: { // 유효성 관리
        type: String
    },
    tokenExp: { // 토큰 유효기간
        type: Number
    }
})

const User = mongoose.model('User', userSchema)
module.exports = { User }