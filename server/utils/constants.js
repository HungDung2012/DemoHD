const {faker} = require('@faker-js/faker');
const bcrypt = require('bcrypt')
const hashPassword = pwd => bcrypt.hashSync(pwd, bcrypt.genSaltSync(10));
module.exports.roles =  {
    roles: [
        {
            code: 'ROL1',
            value: 'Admin',
            createAt: Date.now(),
            updateAt: Date.now(),
        },
        {
            code: 'ROL3',
            value: 'Owner',
            createAt: Date.now(),
            updateAt: Date.now(),
        },
        {
            code: 'ROL5',
            value: 'Agent',
            createAt: Date.now(),
            updateAt: Date.now(),
        },
        {
            code: 'ROL7',
            value: 'Customer',
            createAt: Date.now(),
            updateAt: Date.now(),
        },
    ],
    users: Array.from([...Array(10).keys()]).map(() => ({
        name: faker.person.fullName(),
        phone: '0'+ faker.string.numeric({length: 9}),
        email: faker.internet.email({
            provider: 'gmail.com', 
            allowSpecialCharacters: false,
            address: faker.location.streetAddress({useFullAddress: true}),
            password: hashPassword('123456'),
            avatar: faker.image.avatar(),
            createAt: Date.now(),
            updateAt: Date.now(),
        }),
    })),
    user_roles: Array.from([...Array(10).keys()]).map(() => ({
        userId: 
    }))
}

