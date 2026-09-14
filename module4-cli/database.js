const {readFile} =require('fs')

const {promisify} =require('util')

const readFileAsync=promisify(readFile)
/*
 Outra Forma de Obter dados Json
 const dadosJson=require('./herois.json')
*/
class Database{
  constructor(){
    this.Nome_ARQUIVO='herois.json'
  }
  async obterDadosArquivo(){
    const arquivo= await readFileAsync(this.Nome_ARQUIVO,'utf-8')
    return JSON.parse(arquivo,toString())
  }
  escreverArquivos(){

  }
  async listar(id){
    const dados=await this.obterDadosArquivo()
    const dadosFiltrados=dados.filter(item=>id ?(item.id===id):true)
    return dadosFiltrados
  }
}

module.exports=new Database()