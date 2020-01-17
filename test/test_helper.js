require('dotenv').config()
const mongoose = require('mongoose')

//development mode
//DATABASE_API = mongodb://localhost
mongoose.connect(`${process.env.DATABASE_API}/users_test`, { useNewUrlParser: true })

mongoose.connection
    .once('open', () => console.log("Good to go"))
    .on('error', (error) => {
        console.warn("Error CONNECTION", error)
    })          