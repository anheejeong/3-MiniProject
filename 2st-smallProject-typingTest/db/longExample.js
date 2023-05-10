const mongoose = require('mongoose');

const longExampleSchema = new mongoose.Schema({
    ex: {
        type: String,
        require: true
    }
});

const LongExample = mongoose.model('LongExample', longExampleSchema);

module.exports = LongExample;