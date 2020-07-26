const assert = require('assert')
const User = require('../src/user')

describe('Deleting a user', () => {
    var joe = null

    beforeEach(done => {
        joe = new User({ name: 'Joe' })
        joe.save().then(() => done())
    })

    it('model instance remove', (done) => {
        joe.remove()
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user === null)
                done()
            })
            .catch(error => {
                console.log(error)
                done(error)
            })
    })

    it('class method remove', (done) => {
        User.deleteMany({ name: "Joe" })
            .then(() => User.find({ name: 'Joe' }))
            .then((users) => {
                assert(users.length === 0)
                done()
            })
            .catch(error => {
                console.log(error)
                done(error)
            })
    })

    it('class method findAndRemove', (done) => {
        User.findOneAndRemove({ name: "Joe" })
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user === null)
                done()
            })
            .catch(error => {
                console.log(error)
                done(error)
            })
    })

    it('class method findAndRemove', (done) => {
        User.findByIdAndRemove(joe._id)
            .then(() => User.findById(joe._id))
            .then((user) => {
                assert(user === null)
                done()
            })
            .catch(error => {
                console.log(error)
                done(error)
            })
    })

})