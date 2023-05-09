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

]

wordExample.insertMany(wordInsert)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })