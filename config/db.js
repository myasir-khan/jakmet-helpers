const { Sequelize } = require('sequelize')
const exec = require('child_process').exec
const addModels = require('../models')
const addDynamicModels = require('../dynamicModels')
const config = require('./config').development

const init = (cloudConfig = config, schema = null, alter = false) => {
    try {
        let db = new Sequelize({ ...cloudConfig, ssl: true, pool: { maxConnections: 50, maxIdleTime: 30 }, language: 'en' })

        console.log('connecting...')
        db.authenticate()
        // db.sync()
        db.sync({ alter })
        // db.sync({ force: true })

        console.log('Connection has been established successfully.')


        db.createSchema('search_admin')
            .then(() => console.log('****'))
            .catch((e) => console.log('error'))

        addModels(db)

        if (schema) {
            console.log('schema')
            try {
                db.createSchema(schema)
                    .then(() => console.log('new schema'))
                    .catch((e) => console.log('error'))

                addDynamicModels(db, schema)
            }
            catch (e) {
            }
        }

        return db
    }
    catch (error) {
        console.log('Unable to connect to the database:', error)

        return null
    }
}

const initPromise = (cloudConfig = config, schema, alter = false) => {
    try {
        let db = new Sequelize({ ...cloudConfig, ssl: true, pool: { maxConnections: 50, maxIdleTime: 30 }, language: 'en' })

        console.log('connecting...')
        db.authenticate()
        // db.sync()
        db.sync({ alter })
        // db.sync({ force: true })

        console.log('Connection has been established successfully.')

        try {
            db.createSchema(schema)
                .then(() => {
                    console.log('new schema')
                })
                .catch((e) => console.log('error'))
            addDynamicModels(db, schema)
        }
        catch (e) {
            reject(null)
        }

        return db
    }
    catch (error) {
        console.log('Unable to connect to the database:', error)

        return null
    }
}

// const createDB = () => {
//     exec('cd node_modules && cd context-helpers && npm run createDB', (error, stdout, stderr) => {
//         console.log('stdout: ' + stdout)
//         console.log('stderr: ' + stderr)
//         if (error !== null) {
//             console.log('exec error: ' + error)
//         }
//     })
// }

const migrateDB = () => {
    try {
        let migration = process.env.NODE_ENV === 'production' ? 'createMigrationProduction' : 'createMigration'
        exec(`cd node_modules && cd context-helpers && npm run ${migration}`, (error, stdout, stderr) => {
            console.log('stdout: ', stdout)
            console.log('stderr: ', stderr)
            if (error !== null) {
                console.log('exec error: ', error)
            }
        })
    }
    catch (e) {
        console.log('***')
    }
}

// var sequelize = new Sequelize(config.database, config.username, config.password, {
//     host: config.host,
//     port: 5432,
//     maxConcurrentQueries: 100,
//     dialect: 'postgres',
//     dialectOptions: {
//         ssl: true
//     },
//     pool: { maxConnections: 5, maxIdleTime: 30 },
//     language: 'en'
// })

module.exports = {
    init,
    migrateDB,
    initPromise
}
