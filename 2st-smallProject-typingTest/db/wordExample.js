const mongoose = require('mongoose');

const wordExampleSchema = new mongoose.Schema({
    word: {
        type: String,
        require: true
    }
});

const WordExample = mongoose.model('WordExample', wordExampleSchema);

module.exports = WordExample;