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

beforeEach(async () => {
    const { users, comments, blog_posts } = mongoose.connection.collections
    
    try{
        await users.drop();  
    }
    catch(err){
        err.message.should.equal("ns not found")
    }
    try{
        await comments.drop();  
    }
    catch(err){
        err.message.should.equal("ns not found")
    }
    try{
        await blog_posts.drop();  
    }
    catch(err){
        err.message.should.equal("ns not found")
    }
})