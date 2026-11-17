const Icrud = require('./interfaces/interfaceCrud')
const mongoose = require('mongoose')

const mongoUrl = process.env.mongo_url || 'mongodb+srv://carvalhorizandro_db_user:94EZZj7pVaAs8L27@cluster0.c27qxoo.mongodb.net/'

const STATUS = {
  0: 'Disconectado',
  1: 'Conectado',
  2: 'Conectando',
  3: 'Desconectando',

}

class MongoDB extends Icrud {
  constructor() {
    super()
    this._driver = null
    this._herois = null
    const heroiSchema = new mongoose.Schema({
      nome: {
        type: String,
        required: true
      },
      poder: {
        type: String,
        required: true
      },
      insertedAt: {
        type: Date,
        default: Date.now
      }
    })
  }
  async isConnected() {
    const state = STATUS[this._driver.readyState]
    if (state === 'conectado') return state
    if (state === 'desconectado') {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return this.isConnected()
    }
    // para 'conectando' ou 'desconectando', tenta novamente após breve pausa
    if (state === 'conectando' || state === 'desconectando') {
      await new Promise(resolve => setTimeout(resolve, 500))
      return this.isConnected()
    }
    return state

  }
  defineModel() {
    this._herois = mongoose.model('herois', this.heroiSchema)
  }
  async connect() {
    await mongoose.connect(mongoUrl)
      .then(() => console.log('Conexão estabelecida com sucesso!'))
      .catch((error) => {
        console.log('Falha na conexão!', error)
      })
    this.defineModel()
    const connection = mongoose.connection
    connection.once('open', () => console.log('database rodando!!'))

    this._driver = connection
  }
   create(item) {
    return this._herois.create(item)
  }
}

module.exports = MongoDB