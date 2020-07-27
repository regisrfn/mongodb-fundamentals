require('dotenv').config()
const mongoose = require('mongoose')
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

beforeEach((done) => {
    if (mongoose.connection.collections.users) {
        const { users } = mongoose.connection.collections
        users.drop()
            .then(() => done())
            .catch(error => {
                console.log(error)
                done(error)
            })
    } else {
        done()
    }
})