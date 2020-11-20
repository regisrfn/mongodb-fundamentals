const assert = require('assert')
const User = require('../src/user')

describe('Creating records', () => {
    it('saves a user', async () => {
        const joe = new User({ name: 'Joe' })
        await joe.save()
        assert(!joe.isNew)
    })
    it('saves a user 2', done => {
        const joe = new User({ name: 'Joe' })
        joe.save()
            .then(() => User.find({ name: 'Joe' }))
            .then(users => {
                assert.strictEqual(users.length,1)
                assert(users[0]._id.toString() === joe._id.toString())
                assert(!joe.isNew)
                console.log("ixe")
                done()
            })
            .catch(err => {
                console.log("ixe")
                done(err)
            })
    })
})