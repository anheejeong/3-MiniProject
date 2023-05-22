const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
// mongoDB cluster 연결
// cluster : login-learning
mongoose.connect('mongodb+srv://eyrt6973:h1ufa7qEbeghm2sQ@login-learning.3yfxfrs.mongodb.net/?retryWrites=true&w=majority', {
    //useNewUrlParser: true, userUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})
//

