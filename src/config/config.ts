export default {
    port: 3000,
    db: {
        dev: {
            host: 'mongo',
            name: 'dbContainer'
        },
        test: {
            host: 'mongo',
            name: 'dbTestContainer'
        }
    }
};
