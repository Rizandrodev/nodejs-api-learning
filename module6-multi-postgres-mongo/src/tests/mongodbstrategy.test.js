const assert = require('assert')
const mongo = require('../db/strategies/mongo')
const Context = require('../db/strategies/base/contextSatrtegy')
const MongoDB = require('../db/strategies/mongo')


const MOCK_HEROI_CADASTRAR = {
  nome: 'Mulher Maravilha',
  poder: 'Laco'
}
const MOCK_HEROI_ATUALIZAR = {
  nome: 'Mulher Maravilha',
  poder: 'Laco'
}
const MOCK_HEROI_EXCLUIR = {
  nome: 'Teste Exclusao',
  poder: 'Qualquer coisa'
}
const context = new Context(new MongoDB())

describe("mongo Db suite de Testes", () => {
  before(async () => {
    await context.connect()
    const result = await context.create(MOCK_HEROI_ATUALIZAR)
    MOCK_HEROI_ATUALIZAR_ID = result._id
  })
  it('verificar conexao', async () => {
    const result = await context.isConnected()
    const expected = 'Conectado'

    assert.deepEqual(result, expected)
  })
  it('cadastrar', async () => {
    const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR)
    
    assert.deepEqual({ nome, poder }, MOCK_HEROI_CADASTRAR)
  })
  it('listar', async () => {
    const [result] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome })
    const { _id, __v, insertedAt, ...resultWithoutMongooseFields } = result
    
    assert.deepEqual(resultWithoutMongooseFields, MOCK_HEROI_CADASTRAR)
  })
  it('atualizar', async () => {
    const itemAtualizar=await context.read({nome:MOCK_HEROI_ATUALIZAR.nome})
    const newItem = {
      ...MOCK_HEROI_ATUALIZAR,
      nome: 'Mulher Maravilha'
    }
    const result = await context.update(MOCK_HEROI_ATUALIZAR_ID, newItem)
    assert.deepEqual(result.nome, newItem.nome)
  })
  it('excluir', async () => {
    const itemRemovido = await context.create(MOCK_HEROI_EXCLUIR)
    const result = await context.delete(itemRemovido.id)
    assert.deepEqual(result.deletedCount, 1)
  })
})
