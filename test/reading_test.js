const assert = require('assert')
const User = require('../src/user')

describe("Reading users out of the database", () => {
    it('find a user with a particular id', async () => {
        const joe = new User({ name: 'Joe' })
        await joe.save()
        const user = await User.findOne({ _id: joe._id })
        assert(user._id.toString() === joe._id.toString())
    })
    it('find a user with a particular id', async () => {
        const joe = new User({ name: 'Joe' })
        await joe.save()
        const users = await User.find({ name: 'Joe' })
        assert(users[0]._id.toString() === joe._id.toString())

    })
})