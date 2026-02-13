const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.DB_USER || 'app_user',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'app_db',
    password: process.env.DB_PASSWORD || 'app_password',
    port: Number(process.env.DB_PORT) || 5442,
})


module.exports = pool
