const {deepEqual} =require('assert')

const database=require('./database.js')
const DEFAULT_ITEM_CADASTRAR={
  name:'Flash',
  poder:'speed',
  id:1
}
describe('Suite de Manipulacao de Herois',()=>{
  it('deve pesquisar herois usando arquivos',async ()=>{
    const expected=DEFAULT_ITEM_CADASTRAR
    const resultado=await database.listar(expected.id)
    const posicao1=resultado[0]
    deepEqual(posicao1,expected)
  })
})