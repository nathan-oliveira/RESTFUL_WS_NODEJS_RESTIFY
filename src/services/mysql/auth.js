const sha1 = require('sha1')
const jwt = require('jsonwebtoken')

const auth = ({ connection, errorHandler }) => {
  return {
    authenticate: (email, password) => {
      return new Promise((resolve, reject) => {
        const sql = 'SELECT id, email FROM users WHERE email = ? AND password = ?'
        const data = [email, sha1(password)]

        connection.query(sql, [data], (error, results) => {
          if (error || !results.length) {
            errorHandler(error, 'Usuário e/ou senha inválidos', reject)
            return false
          }

          const token = jwt.sign({ email, id: results[0].id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 })
          resolve({ token })
        })
      })
    }
  }
}

module.exports = auth
