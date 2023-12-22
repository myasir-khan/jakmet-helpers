module.exports = {
    development: {
        username: 'postgres',
        password: 'postgres',
        database: 'postgres',
        host: 'localhost',
        dialect: 'postgres',
        port: 5432
    },
    production: {
        username: 'postgres',
        password: 'postgres',
        database: 'postgres',
        host: process.env.HOST,
        dialect: 'postgres',
        port: 5432
    }
}