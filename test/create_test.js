const assert = require('assert')
const User = require('../src/user')

describe('Creating records', () => {
    it('saves a user', async () => {
        const joe = new User({ name: 'Joe' })
        await joe.save()
        assert(!joe.isNew)
    })
})