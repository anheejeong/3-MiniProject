const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const { readFile } = require('fs');

// db까지 써야하는 일인가?
mongoose.connect('mongodb://127.0.0.1:27017/typingTest')
    .then(() => {
        console.log("MONGO CONNECTION OPEN")
    })
    .catch(err => {
        console.log("MONGO CONNECTION ERROR");
        console.log(err);
    });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// 메인 페이지
app.get('/', (req, res) => {
    res.render('main/main');
})

app.get('/alphabet', (req, res) => {
    res.render('alphabet/alphabet');
})

app.get('/word', (req, res) => {
    res.render('word/word');
})

app.get('/short', (req, res) => {
    res.render('short/short');
})

app.get('/long', (req, res) => {
    res.render('long/long');
})

/* 이미지 업로드 어떻게 해?
app.get('/img', (req, res) => {
    readFile('/public/image/keyboard.jpg', (err, data) => {
        if (err) res.send();
        res.send(data);
    })
})
*/


app.listen(2000, () => {
    console.log("Listening on port 3000!");
})