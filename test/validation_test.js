const assert = require('assert')
const User = require('../src/user')

describe('Validating records', () => {
    it('username required', () => {
        const user = new User({ name: undefined })
        const validationResult = user.validateSync()
        const { message } = validationResult.errors['name']

        assert(message === 'Name is required')
    })

    it('username size', () => {
        const user = new User({ name: 'Al' })
        const validationResult = user.validateSync()
        const { message } = validationResult.errors['name']

        assert(message === 'Name too short')
    })

    it('saving username invalid', (done) => {
        const user = new User({ name: 'Al' })
        user.save()
            .then (() =>  done('error - user shound\'t be saved'))
            .catch(err => {
                const {message} = err.errors['name']
                assert(message === 'Name too short')
                done ()
            })
    })
})