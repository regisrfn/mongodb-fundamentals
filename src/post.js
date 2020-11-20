const mogoose = require('mongoose')
const Schema = mogoose.Schema

const PostSchema = new Schema ({
    title: String
})

module.exports = PostSchema