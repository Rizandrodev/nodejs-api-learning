const assert = require('assert')
const postgres = require('../db/strategies/postgres')
const Context = require('../db/strategies/base/contextSatrtegy')

const context = new Context(new postgres())
const MOCK_HEROI_CADASTRAR = {
  nome: 'Strange Doctor',
  poder: 'Magic'

}
const MOCK_HEROI_ACTUALIZAR = {
  nome: 'Strange Doctor',
  poder: 'Magic'

}
const MOCK_HEROI_EXCLUIR = {
  nome: 'Herói para excluir',
  poder: 'Poder Teste'
}
let idActualizar
describe('Postgres Connection', function () {
  this.timeout(10000)
  before(async function () {
    await context.connect()
    const { id } = await context.create(MOCK_HEROI_ACTUALIZAR)
    idActualizar = id
  })
  it('deve conectar ao Postgres', async function () {
    const result = await context.isConnected()
    assert.equal(result, true)
  })
  it('cadastrar', async () => {
    const result = await context.create(MOCK_HEROI_CADASTRAR)
    console.log('result', result)
    // assert.ok(id, 'deve retornar id gerado')
    delete result.id
    assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
  })
  it('listar', async () => {
    const [result] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome })
    delete result.id
    assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
  })

  it('actualizar', async () => {
    const [itemAtualizar]=await context.read({nome:MOCK_HEROI_ACTUALIZAR.nome})
    const newItem = {
      ...MOCK_HEROI_ACTUALIZAR,
      nome: 'Mulher Maravilha'
    }
    const [result] = await context.update(idActualizar, newItem)
    const [itemActualizado]=await context.read({id:itemAtualizar.id})
    assert.deepEqual(result, 1)
  })

  it('excluir', async () => {
    const [itemRemovido] = await context.read({ nome: MOCK_HEROI_EXCLUIR.nome })
    if (!itemRemovido) {
      // Create the hero if it doesn't exist (in case before hook didn't create it)
      await context.create(MOCK_HEROI_EXCLUIR)
      const [newItem] = await context.read({ nome: MOCK_HEROI_EXCLUIR.nome })
      const result = await context.delete(newItem.id)
      assert.deepEqual(result, 1)
    } else {
      const result = await context.delete(itemRemovido.id)
      assert.deepEqual(result, 1)
    }
  })

})
