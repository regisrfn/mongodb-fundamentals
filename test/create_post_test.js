const assert = require('assert')
const User = require('../src/user')

describe('Creating post', () => {
    it('saves a post', async () => {
        const joe = new User({
            name: 'Joe',
            posts: [{ title: "PostTitle" }]
        })
        await joe.save()
        assert(!joe.isNew)

        const user = await User.findOne({name:"Joe"})
        assert(user.posts[0].title === 'PostTitle')
    })
})