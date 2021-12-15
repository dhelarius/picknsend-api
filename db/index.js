const config = require('../config');

const dbConfig = {
    mongoUri: config.db.mongoUri
}

module.exports = {
    uri: dbConfig.mongoUri
}