const assert = require('assert')
const mongo = require('../db/strategies/mongo')
const Context = require('../db/strategies/base/contextSatrtegy')
const MongoDB = require('../db/strategies/mongo')


const MOCK_HEROI_CADASTRAR={
  nome:'Mulher Maravilha',
  poder:'Laco'
}
const context = new Context(new MongoDB)

describe("mongo Db suite de Testes",()=>{
  before(async()=>{
    await context.connect()
  })
  it('verificando a conexao',async()=>{
    const result =await context.isConnected()
    const expected= 'Conectado'
    assert.deepEqual(result,expected)
  })
  it('cadastrar',async ()=>{
    const {nome,poder}=await context.create(MOCK_HEROI_CADASTRAR)
    assert.deepEqual({nome,poder},MOCK_HEROI_CADASTRAR)
  })
})
