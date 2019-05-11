const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')


const DatabaseConnection = () => {
    const low = require('lowdb')
    const FileSync = require('lowdb/adapters/FileSync')

    const adapter = new FileSync('database/db.json')
    const db = low(adapter)

    db.defaults({ messages: [], users: [] })
        .write()

    return db;
}

module.exports = DatabaseConnection;