const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PostSchema = require('./post')

const UserSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: "Name too short"
        },
        required: [true, 'Name is required']
    },
    postCount: Number,
    posts:[PostSchema]
})

UserSchema.virtual('postCounter').get(function() {
    return this.posts.length
})

const User = mongoose.model('user', UserSchema)

module.exports = User;