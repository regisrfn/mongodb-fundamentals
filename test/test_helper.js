require('dotenv').config()
const mongoose = require('mongoose');
const User = require('../src/user');
const assert = require('assert');

mongoose.Promise = global.Promise;

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

beforeEach((done) => {
    const { users, comments, blog_posts } = mongoose.connection.collections
    Promise.all([
        users.drop().catch(err => handleNotFoundDB(err)),
        comments.drop().catch(err => handleNotFoundDB(err)),
        blog_posts.drop().catch(err => handleNotFoundDB(err))
    ])
        .then(() => {
            done();
        })
        .catch((err) => done(err))
})

function handleNotFoundDB(err) {
    assert.strictEqual(err.message, "ns not found");
}

