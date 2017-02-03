const DEFAULT_PASSWORD = 'p@ssw0rd';
export default [
    {
        name: {
            first: 'Clark',
            last: 'Kent'
        },
        email: 'clark@dailyplanet.com',
        local: {
            username: 'superman',
            password: DEFAULT_PASSWORD
        },
        admin: true,
        createdDate: new Date('2016-09-12')
    },
    {
        name: {
            first: 'Bruce',
            last: 'Wayne'
        },
        email: 'bruce@wayneenterprises.com',
        local: {
            username: 'batman',
            password: DEFAULT_PASSWORD
        },
        admin: false,
        createdDate: new Date('2016-09-14')
    },
    {
        name: {
            first: 'Tony',
            last: 'Stark'
        },
        email: 'tony@starklabs.com',
        local: {
            username: 'ironman',
            password: DEFAULT_PASSWORD
        },
        admin: true,
        createdDate: new Date('2016-09-17')
    },
    {
        name: {
            first: 'Oliver',
            last: 'Queen'
        },
        email: 'oliver@queenconsolidated.com',
        local: {
            username: 'arrow',
            password: DEFAULT_PASSWORD
        },
        admin: true,
        createdDate: new Date('2017-01-20')
    },
    {
        name: {
            first: 'Barry',
            last: 'Allen'
        },
        email: 'barry@starzlabs.com',
        local: {
            username: 'theflash',
            password: DEFAULT_PASSWORD
        },
        admin: false,
        createdDate: new Date('2016-09-20')
    },
    {
        name: {
            first: 'Bruce',
            last: 'Banner'
        },
        email: 'bruce@pantheon.com',
        local: {
            username: 'hulk',
            password: DEFAULT_PASSWORD
        },
        admin: false,
        createdDate: new Date('2016-10-28')
    }
];
