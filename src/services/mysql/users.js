const sha1 = require('sha1')

const users = ({ connection, errorHandler }) => {
  return {
    all: () => {
      return new Promise((resolve, reject) => {
        connection.query('SELECT id, email FROM users', (error, results) => {
          if (error) {
            errorHandler(error, 'Falha ao listar os usuários', reject)
            return false
          }

          resolve({ pagination: { page: 2, results: results.length }, users: results })
        })
      })
    },
    save: (email, password) => {
      return new Promise((resolve, reject) => {
        connection.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, sha1(password)], (error, results) => {
          if (error) {
            errorHandler(error, `Falha ao salvar o usuário ${email}`, reject)
            return false
          }

          resolve({ user: { email, id: results.insertId } })
        })
      })
    },
    update: (id, password) => {
      return new Promise((resolve, reject) => {
        connection.query('UPDATE users SET password = ? WHERE id = ?', [sha1(password), id], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, 'Falha ao atualizar o usuário!', reject)
            return false
          }

          resolve({ user: { id }, affectedRows: results.affectedRows })
        })
      })
    },
    del: (id) => {
      return new Promise((resolve, reject) => {
        connection.query('DELETE FROM users WHERE id = ?', [id], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, 'Falha ao remover o usuário!', reject)
            return false
          }

          resolve({ message: 'Usuário removida com sucesso!', affectedRows: results.affectedRows })
        })
      })
    }
  }
}

module.exports = users
