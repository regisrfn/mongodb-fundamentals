const assert = require('assert')
const User = require('../src/user')

describe("Reading users out of the database", () => {
    var joe = null
    beforeEach( (done) => {
        joe = new User({ name: 'Joe' })
        joe.save().then(() => done())
    })
    it('find a user with a particular id', async () => {
        const user = await User.findOne({ _id: joe._id })
        assert(user._id.toString() === joe._id.toString())
    })
    it('find a user with a particular id', async () => {
        const users = await User.find({ name: 'Joe' })
        assert(users[0]._id.toString() === joe._id.toString())

    })
})