const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    model: { type: String, required: true },
    color: { type: String, required: true },
});

module.exports = mongoose.model('Car', carSchema);