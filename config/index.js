const path = require('path');
const development = require('./env/development');

const defaults = {
    root: path.join(__dirname, '..')
}

module.exports = {
    development: Object.assign({}, defaults, development)
}[process.env.NODE_ENV || 'development']