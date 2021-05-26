const { test, connection, errorHandler } = require('./setup')
const users = require('../users')({ connection, errorHandler })

test.beforeEach(t => connection.query('TRUNCATE TABLE users'))
test.after.always(t => connection.query('TRUNCATE TABLE users'))

const create = (email = 'user@test.com', password = 'password') => users.save(email, password)

test('Lista de usuário', async t => {
  await create()
  const result = await users.all()
  t.is(result.users.length, 1)
  t.is(result.users[0].email, 'user@test.com')
})

test('Criação de usuário', async t => {
  const result = await create()
  t.is(result.user.name, 'user@test.com')
})

test('Atualização de usuário', async t => {
  await create()
  const result = await users.update(1, '123456789')
  t.is(result.affectedRows, 1)
})

test('Remoção de usuário', async t => {
  await create()
  const result = await users.update(1)
  t.is(result.affectedRows, 1)
})
