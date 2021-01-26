const assert = require('assert')
const { findOne } = require('../src/user')
const User = require('../src/user')

describe('Virtual type', () => {
    it('postCount return number of posts', done => {
        const joe = new User({
            name: "Joe",
            posts: [{ title: 'PostTitle' }]
        })
        joe.save()
            .then((user) => User.findById(user._id))
            .then((user) => {
                assert(user.posts.length === user.postCounter)
                done()
            })
            .catch(err => done(err))
    })
})