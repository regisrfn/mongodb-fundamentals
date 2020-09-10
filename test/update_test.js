const assert = require('assert')
const User = require('../src/user')

function assertName(saveOperation, done) {
    saveOperation
        .then(() => User.find())
        .then(users => {
            assert(users.length === 1)
            assert(users[0].name === 'Alex')
            done()
        })
        .catch(error => done(error))
}

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
        assertName(joe.save(), done)
    })

    it('A model instance can update', (done) => {
        assertName(joe.updateOne({ name: 'Alex' }), done)
    })

    it('A model class can update', (done) => {
        assertName(
            User.updateMany({ name: 'Joe' }, { name: 'Alex' }),
            done
        )
    })

    it('Class update by id', (done) => {
        assertName(
            User.findByIdAndUpdate(joe._id, { name: 'Alex' }),
            done
        )
    })
})