const assert = require('assert')
const User = require('../src/user')

describe("Reading users out of the database", () => {
    const joe = new User({ name: 'Joe' })
    beforeEach(done => {
        joe.save().then(() => done())
    })
    it('find a user with a particular id', done => {
        User.findOne({ _id: joe._id })
            .then(() => {
                assert(true)
                done()
            })
            .catch(error => {
                console.log(error)
                assert(false)
                done()
            })
    })
})

describe("Reading users out of the database", () => {
    const joe = new User({ name: 'Joe' })
    beforeEach(done => {
        joe.save().then(() => done())
    })
    it('finds all users with a name of joe', (done) => {
        User.find({ name: 'Joe' })
            .then((users) => {
                assert(users[0]._id.toString() === joe._id.toString())
                done()
            })
            .catch(error => {
                console.log(error)
                assert(false)
                done()
            })
    })

})