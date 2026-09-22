const { readFile, writeFile } = require('fs')

const { promisify } = require('util')

const readFileAsync = promisify(readFile)
const WriteFileAsync = promisify(writeFile)
/*
 Outra Forma de Obter dados Json
 const dadosJson=require('./herois.json')
*/
class Database {
  constructor() {
    this.NOME_ARQUIVO = 'herois.json'
  }
  async obterDadosArquivo() {
    const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf-8')
    return JSON.parse(arquivo, toString())
  }
  async escreverArquivos(dados) {
    await WriteFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados))
    return true;
  }

  async cadastrar(heroi) {
    const dados = await this.obterDadosArquivo()
    const id = heroi.id <= 2 ? heroi.id : Date.now()
    const heroicomID = {
      id,
      ...heroi
    }
    const dadosFinal = [
      ...dados,
      heroicomID 
    ]
    const resultado = await this.escreverArquivos(dadosFinal)
    return resultado
  }
  async listar(id) {
    const dados = await this.obterDadosArquivo()
    const dadosFiltrados = dados.filter(item => id ? (item.id === id) : true)
    return dadosFiltrados
  }

  async remover(id) {
    if (!id) {
      return await this.escreverArquivos([])
    }
    const dados =await this.obterDadosArquivo()
    console.log('id',id)
    const indice = dados.findIndex(item => item.id === parseInt(id))
    if(indice===-1){
      throw Error('O usuario informado nao existe')
    }
    dados.splice(indice,1)
    return await this.escreverArquivos(dados)
  }
}

module.exports = new Database()