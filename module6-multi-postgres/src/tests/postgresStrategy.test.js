const assert = require('assert')
const postgres = require('../db/strategies/postgres')
const Context = require('../db/strategies/base/contextSatrtegy')

const context = new Context(new postgres())
const MOCK_HEROI_CADASTRAR = {
  nome: 'Strange Doctor',
  poder: 'Magic'

}
describe('Postgres Connection', function () {
  this.timeout(10000)
  before(async function () {
    await context.connect()
  })
  it('deve conectar ao Postgres', async function () {
    const result = await context.isConnected()
    assert.equal(result, true)
  })
  it('cadastrar', async () => {
    const result= await context.create(MOCK_HEROI_CADASTRAR)
    console.log('result',result)
    // assert.ok(id, 'deve retornar id gerado')
    delete result.id
    assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
  })
})
