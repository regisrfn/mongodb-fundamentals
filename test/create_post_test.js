const assert = require('assert')
const User = require('../src/user')
const Post = require('../src/post')


describe('Creating post', () => {
    it('saves a post', async () => {
        const joe = new User({
            name: 'Joe',
            posts: [{ title: "PostTitle" }]
        })
        await joe.save()
        assert(!joe.isNew)

        const user = await User.findOne({ name: "Joe" })
        assert(user.posts[0].title === 'PostTitle')
    })

    it('add subDocuments to an existing record', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: []
        })
        joe.save()
            .then(() => User.findOne({ name: "Joe" }))
            .then(user => {
                user.posts.push({ title: "New Post" })
                return user.save();
            })
            .then((user) => {
                assert.strictEqual(joe._id.toString(), user._id.toString())
                done()
            })
            .catch(error => {
                done(error)
            })
    })

    it('remove subdocuments to an existing record', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: [{ title: "New Post" }]
        })
        joe.save()
            .then(() => User.findOne({ name: "Joe" }))
            .then(user => {
                user.posts[0].remove()
                return user.save();
            })
            .then((user) => {
                assert.strictEqual(user.posts.length, 0);
                assert.strictEqual(joe._id.toString(), user._id.toString())
                done()
            })
            .catch(error => {
                done(error)
            })
    })
})