const assert = require('assert')
const User = require('../src/user')

describe('Updating records', () => {
    var joe = null

    beforeEach(done => {
        joe = new User({ name: 'Joe' })
        joe.save()
            .then(() => done())
            .catch(error => done(error))
    })

    it('instance type using set and save', (done) => {
        joe.set('name', 'Alex')
        joe.save()
            .then(() => User.find())
            .then(users => {
                assert(users.length === 1)
                assert(users[0].name === 'Alex')
                done()
            })
    })
})