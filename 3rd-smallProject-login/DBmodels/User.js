const mongoose = require('mongoose')
// bcrypt 이용 방법 : https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcrypt')
// salt를 이용해서 비밀번호를 암호화 해야 함 => salt 생성 필요
// saltRounds : salt가 몇글자인지 정해줌
const saltRounds = 10
var jwt = require('jsonwebtoken'); // 토큰


const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true  // 스페이스 없애줌
    },
    password: { // 보안성이 약해서 Bcrypt로 암호화해야함
        // npm install bcrypt --save
        type: String,
        minlength: 5
    },
    lastname: {
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

// user.save()로 들어가기 전에 먼저 처리함
userSchema.pre('save', function (next) {
    var user = this
    // 비밀번호가 변환될 때만 bcrypt 실행
    if (user.isModified('password')) {
        // 비밀번호 암호화 시킴
        // salt 생성
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)
            bcrypt.hash(user.password, salt, function (err, hash) {
                // Store hash in your password DB.
                if (err) return next(err)
                user.password = hash
                next()
            });
        });
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function (plainPassword, callback) {
    // 암호화 된 비밀번호를 복호화 할 순 없으므로 painPassword를 암호화해야함
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return callback(err)
        callback(null, isMatch)
    })
}

userSchema.methods.generateToken = async function (callback) {
    var user = this
    // jsonwebtoken을 이용해서 token 생성
    var token = jwt.sign(user._id.toHexString(), 'secretToken');
    // user._id + 'secretToken' = token
    // 'secretToken' -> user._id
    user.token = token
    var result = await user.save()
        .then(() => {
            return callback(null, user)
        })
        .catch((err) => {
            return callback(err)
        })

}

userSchema.methods.findByToken = function (token, callback) {
    var user = this

    // token decode
    jwt.verify(token, 'secretToken', function (err, decoded) {
        // 유저 아이디를 이용해서 유저를 찾고
        // 클라이언트에서 가져온 토큰과 DB에 보관된 토큰이 일치하는지 확인

        user.findOnd({ "_id": decoded, "token": token }, function (err, user) {
            if (err) return callback(err)
            callback(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema)
module.exports = { User }