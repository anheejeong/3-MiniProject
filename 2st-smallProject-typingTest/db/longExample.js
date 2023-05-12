const mongoose = require('mongoose');

const longExampleSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        requrie: true
    }
});

const LongExample = mongoose.model('LongExample', longExampleSchema);

module.exports = LongExample;