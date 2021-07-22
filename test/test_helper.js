require('dotenv').config()
const mongoose = require('mongoose')
const User = require('../src/user')
mongoose.Promise = global.Promise

before((done) => {
    //development mode
    //DATABASE_API = mongodb://localhost
    mongoose.connect(`${process.env.DATABASE_API}/users_test`, {
        useNewUrlParser: true,
        useUnifiedTopology: true, useFindAndModify: false
    })
    mongoose.connection
        .once('open', () => { done() })
        .on('error', (error) => {
            console.warn("Error CONNECTION", error)
        })
})

var chai = require('chai');
chai.should();

beforeEach((done) => {
    const { users, comments, blog_posts } = mongoose.connection.collections
    Promise.all([
        users.drop().catch(err => handleNotFoundDB(err, done)),
        comments.drop().catch(err => handleNotFoundDB(err, done)),
        blog_posts.drop().catch(err => handleNotFoundDB(err, done))
    ])
        .then(() => {
            done();
        })
        .catch(() => done(err))
})

function handleNotFoundDB(err, done) {
    return err.message === "ns not found" ? err.message : done(err)
}

