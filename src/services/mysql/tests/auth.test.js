const { test, connection, errorHandler } = require('./setup')
const users = require('../users')({ connection, errorHandler })
const auth = require('../auth')({ connection, errorHandler })
const create = (email = 'user@test.com', password = 'password') => users.save(email, password)

test.beforeEach(t => connection.query('TRUNCATE TABLE users'))
test.after.always(t => connection.query('TRUNCATE TABLE users'))

test('Login de usuário - success', async t => {
  const dataForm = { email: 'user@gmail.com', password: '123456789' }
  await create(dataForm.email, dataForm.password)
  const result = await auth.authenticate(dataForm.email, dataForm.password)
  t.not(result.token, null)
  t.not(result.token.length, 0)
})

test('Login de usuário - error', async t => {
  const dataForm = { email: 'user@gmail.com', password: '123456789' }
  await create(dataForm.email, dataForm.password)
  const promise = auth.authenticate(`${dataForm.email}.br`, dataForm.password)
  const error = await t.throws(promise)
  t.is(error.error, 'Usuário e/ou senha inválidos')
})
