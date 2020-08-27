const mongoose = require('mongoose')

const DraftPostSchema = new mongoose.Schema({
    heading:{
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    genre:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    featurephoto:{
        type: String
    },
    content:{
        type: String,
        required: true
    },
    contentrelphotos:[{
        url:{
            type: String
        }
    }],
    source:{
        type: String
    },
    date: {
        type:Date,
        default: Date.now
    }
})

module.exports = DraftPost = mongoose.model('drafts', DraftPostSchema)