require('dotenv').config()
const mongoose = require('mongoose')

before((done) => {
    //development mode
    //DATABASE_API = mongodb://localhost
    mongoose.connect(`${process.env.DATABASE_API}/users_test`, { useNewUrlParser: true })

    mongoose.connection
        .once('open', () => { done()})
        .on('error', (error) => {
            console.warn("Error CONNECTION", error) 
        })
})

beforeEach((done) => {
    if(mongoose.connection.collections.users){
        mongoose.connection.collections.users.drop()
        .then(() => {
            done()
        })
        .catch((error) => {
            console.log(error)
            done()
        })
    }else{
        done()
    }    
})