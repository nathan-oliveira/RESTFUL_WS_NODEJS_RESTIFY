const test = require('ava')
require('dotenv').config()
const mysqlServer = require('mysql')
const connection = mysqlServer.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE_TESTE
})
const errorHandler = (error, msg, rejectFunction) => {
  console.error(error)
  rejectFunction({ error: msg })
}

module.exports = {
  connection,
  errorHandler,
  test
}
