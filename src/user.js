const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: "Name too short"
        },
        required: [true, 'Name is required']
    },
    postCount: Number
})

const User = mongoose.model('user', UserSchema)

module.exports = User;