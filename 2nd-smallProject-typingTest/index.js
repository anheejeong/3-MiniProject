const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
//const { readFile } = require('fs');

const wordExample = require('./db/wordExample.js');
const shortExample = require('./db/shortExample.js');
const longExample = require('./db/longExample.js');

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

app.get('/word', async (req, res) => {
    const words = await wordExample.find({});
    res.render('word/word', { words });
})

app.get('/short', async (req, res) => {
    const shorts = await shortExample.find({});
    res.render('short/short', { shorts });
})

app.get('/long', async (req, res) => {
    const longs = await longExample.find({});
    res.render('long/long', { longs });
})

app.get('/long/:id', async (req, res) => {
    const { id } = req.params;
    const longs = await longExample.findById(id);
    res.render('long/longTyping', { longs })
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