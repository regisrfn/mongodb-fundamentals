require('dotenv').config()
const mongoose = require('mongoose')

//development mode
//DATABASE_API = mongodb://localhost
mongoose.connect(`${process.env.DATABASE_API}/users_test`, { useNewUrlParser: true })

mongoose.connection
    .once('open', () => {})
    .on('error', (error) => {
        console.warn("Error CONNECTION", error)
    })
    
beforeEach((done) => {
    mongoose.connection.collections.users.drop()
    .then(() => {
        done()
    })
})