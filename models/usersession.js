const mongoose = require('mongoose');

const UserSessionSchema = new mongoose.Schema({
    userId: String,
    timestamp: {
       type: Number,
       default: Date.now()},
    isDeleted : {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('UserSession', UserSessionSchema)

