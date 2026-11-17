require('dotenv').config()
const Mongoose = require('mongoose')

// Carrega a URL do .env ou usa a string direta

// No Mongoose 7+, connect() retorna uma Promise e não aceita mais callback.
// O tratamento de erro de conexão é feito via .catch() ou connection.on('error').




async function main() {
  try {
    
    const listItens = await model.find()
    console.log('list itens', listItens)
  } catch (error) {
    console.error('Erro na execução:', error)
  }
}
main()