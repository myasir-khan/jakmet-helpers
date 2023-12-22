const isNull = require('../isNull')
const { projectId } = require('../../config/gcpConfig')
const { runQuery } = require('../postgresQueries')

const options = {
    keyFilename: process.env.keyFilename,
    projectId
}

const str_validated_field_name = 'validated_field_name'
const str_validated_field_value = 'validated_field_value'

exports.shouldFieldUpdate = async (req, db) => {
    return new Promise(async (resolve, reject) => {
        let body = req?.body
        let id = body?.id
        let validated_field_name = body?.[str_validated_field_name]
        let validated_field_value = body?.[str_validated_field_value]

        const hasFieldName = !isNull(validated_field_name)
        const hasFieldValue = !isNull(validated_field_value)
        const sqlQuery = `SELECT * FROM context.schema_form_key_pairs WHERE id='${id}'`
        console.log(`body => `, body, `query `, sqlQuery)

        if (id) {
            let queryResults = await runQuery(db, sqlQuery)
            let key_pair = queryResults?.flat()?.[0]

            let previousFieldName = key_pair?.[str_validated_field_name]
            let previousFieldValue = key_pair?.[str_validated_field_value]

            if (hasFieldName && isNull(previousFieldName)) {
                resolve(true)
            }
            else if (hasFieldValue && isNull(previousFieldValue)) {
                resolve(true)
            }
            else {
                resolve(false)
            }
        }
        else {
            reject({ message: 'Unknown error occurred', developerInfo: { message: 'Missing params', body: body, query: sqlQuery } })
        }
    })
}

exports.updateField = async (req, db)  => {
    let body = req?.body
    let id = body?.id
    let validated_field_name = body?.validated_field_name
    let validated_field_value = body?.validated_field_value

    const hasFieldName = !isNull(validated_field_name)
    const hasFieldValue = !isNull(validated_field_value)

    const sqlQuery = `UPDATE context.schema_form_key_pairs SET ${hasFieldName ? `${str_validated_field_name}='${validated_field_name}'` : ''} ${(hasFieldName && hasFieldValue) ? ',' : ''} ${hasFieldValue ? ` ${str_validated_field_value}='${validated_field_value}'` : ''} WHERE id='${id}'`
    console.log(`body => `, body, `query `, sqlQuery)
    // console.log(sqlQuery)
    const option = {
        location: 'US',
        query: sqlQuery
    }

    return await runQuery(db, sqlQuery)
}