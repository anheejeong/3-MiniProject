const mongoose = require('mongoose');

const wordExampleSchema = new mongoose.Schema({
    ex: {
        type: String,
        require: true
    }
});

const WordExample = mongoose.model('WordExample', wordExampleSchema);

module.exports = WordExample;