const { test, connection, errorHandler } = require('./setup')
const categories = require('../categories')({ connection, errorHandler })

test.beforeEach(e => connection.query('TRUNCATE TABLE categories'))
test.after.always(e => connection.query('TRUNCATE TABLE categories'))

const create = (name = 'category-test') => categories.save(name)

test('Lista de categorias', async t => {
  await create()
  const result = await categories.all()
  t.is(result.categories.length, 1)
  t.is(result.categories[0].name, 'category-test')
})

test('Criação de categoria', async t => {
  const result = await create()
  t.is(result.category.name, 'category-test')
})

test('Atualização de categoria', async t => {
  await create()
  const result = await categories.update(1, 'category-test-update')
  t.is(result.category.name, 'category-test-update')
  t.is(result.affectedRows, 1)
})

test('Remoção de categoria', async t => {
  await create()
  const result = await categories.update(1)
  t.is(result.affectedRows, 1)
})
