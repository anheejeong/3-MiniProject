const mongoose = require('mongoose');

const shortExampleSchema = new mongoose.Schema({
    ex: {
        type: String,
        require: true
    }
});

const ShortExample = mongoose.model('ShortExample', shortExampleSchema);

module.exports = ShortExample;