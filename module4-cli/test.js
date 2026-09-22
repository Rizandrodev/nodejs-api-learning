const {deepEqual} =require('assert')

const database=require('./database.js')
const DEFAULT_ITEM_CADASTRAR={
  name:'Flash',
  poder:'speed',
  id:1
}
describe('Suite de Manipulacao de Herois',()=>{
  before(async()=>{
    await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
  })
  it('deve pesquisar herois usando arquivos',async ()=>{
    const expected=DEFAULT_ITEM_CADASTRAR
    const resultado=await database.listar(expected.id)
    const posicao1=resultado[0]
    deepEqual(posicao1,expected)
  })
   it('deve cadastrar um  heroi usando arquivos',async ()=>{
    const expected=DEFAULT_ITEM_CADASTRAR
    const resultado=await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
    const actual =await database.listar(DEFAULT_ITEM_CADASTRAR.id)
    deepEqual(actual[0] ,expected)
  })
     it('deve deletar um  heroi usando arquivos',async ()=>{
    const expected=true
    const resultado=await database.remover(DEFAULT_ITEM_CADASTRAR.id)
    deepEqual(resultado ,expected)
  })
})