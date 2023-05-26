const wordExample = require('./db/wordExample.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/typingTest')
    .then(() => {
        console.log("MONGO CONNECTION OPEN")
    })
    .catch(err => {
        console.log("MONGO CONNECTION ERROR");
        console.log(err);
    });

const wordInsert = [
    {
        ex: '공식'
    },
    {
        ex: '그다지'
    },
    {
        ex: '긴장'
    },
    {
        ex: '깎다'
    },
    {
        ex: '다리'
    },
    {
        ex: '따라가다'
    },
    {
        ex: '머물다'
    },
    {
        ex: '명예'
    },
    {
        ex: '뱃사람'
    },
    {
        ex: '부처'
    },
    {
        ex: '숙이다'
    },
    {
        ex: '아가씨'
    },
    {
        ex: '온도'
    },
    {
        ex: '이마'
    },
    {
        ex: '절대로'
    },
    {
        ex: '지붕'
    },
    {
        ex: '지원하다'
    },
    {
        ex: '진짜'
    },
    {
        ex: '짙다'
    },
    {
        ex: '창밖'
    },
    {
        ex: '청소'
    },
    {
        ex: '침묵'
    },
    {
        ex: '텍스트'
    },
    {
        ex: '표면'
    },
    {
        ex: '햇살'
    },
    {
        ex: '객관적'
    },
    {
        ex: '걱정하다'
    },
    {
        ex: '경제적'
    },
    {
        ex: '연필'
    },
    {
        ex: '염려'
    },
    {
        ex: '우습다'
    },
    {
        ex: '운전'
    },
    {
        ex: '익숙하다'
    },
    {
        ex: '일자'
    },
    {
        ex: '잔치'
    },
    {
        ex: '전달되다'
    },
    {
        ex: '전부'
    },
    {
        ex: '차다'
    },
    {
        ex: '치료하다'
    },
    {
        ex: '칸'
    },
    {
        ex: '한'
    },
    {
        ex: '갈수록'
    },
    {
        ex: '갖가지'
    },
    {
        ex: '관광객'
    },
    {
        ex: '거절하다'
    },
    {
        ex: '구별하다'
    },
    {
        ex: '밤하늘'
    },
    {
        ex: '변명'
    },
    {
        ex: '보자기'
    },
]

wordExample.insertMany(wordInsert)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })