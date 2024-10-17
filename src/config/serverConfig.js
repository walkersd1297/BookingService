const dotenv = require('dotenv').config();

module.exports = {
    PORT:process.env.PORT,
    DB_SYNC:process.env.DB_SYNC,
}