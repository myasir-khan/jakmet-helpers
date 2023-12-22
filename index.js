const sequelize = require('./config/db')
const { runQuery } = require('./helpers')

const connectDB = async () => {
    try {
        const db = sequelize.init()

        // sequelize.migrateDB()

        // let query = `INSERT INTO users VALUES('id', 'first_name', 'middle_initial','last_name', 'job_title', ${0}, 'address', 'zip_code', 'city', 'email', 'user_interest_id', 'country', 'state', 'status_id','bdbb049c-99a1-42a3-8ae6-e5f97ca2b8f9', 'hashPassword', 'auth_type', 'social_id', 'phone_number', NOW(), NOW(), ${null}, ${true}, 'token', ${null}, 'collaborator', ${false}, ${false})`

        let query = `SELECT * FROM users`

        let data = await runQuery(db, query)

        // console.log('data', db)
    }
    catch (e) {
        console.log('e', e)
    }
}

// connectDB()

module.exports = {
    ...require('./helpers'),
    sequelize
}