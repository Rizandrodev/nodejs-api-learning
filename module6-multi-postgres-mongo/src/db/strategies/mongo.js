const Icrud = require('./interfaces/interfaceCrud')
const mongoose = require('mongoose')

const mongoUrl = process.env.mongo_url || 'mongodb+srv://carvalhorizandro_db_user:94EZZj7pVaAs8L27@cluster0.c27qxoo.mongodb.net/'

// Cleanup existing model to avoid OverwriteModelError
const cleanupMongooseModel = () => {
  try {
    if (mongoose.models['herois']) {
      delete mongoose.models['herois']
    }
    if (mongoose.modelSchemas['herois']) {
      delete mongoose.modelSchemas['herois']
    }
  } catch (e) {
    // Ignore errors during cleanup
  }
}

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
    this.heroiSchema = new mongoose.Schema({
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
    if (!this._driver) return 'Desconectado'
    const state = STATUS[this._driver.readyState]
    if (state === 'Conectado') return state
    if (state === 'Desconectado') {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return this.isConnected()
    }
    // para 'Conectando' ou 'Desconectando', tenta novamente após breve pausa
    if (state === 'Conectando' || state === 'Desconectando') {
      await new Promise(resolve => setTimeout(resolve, 500))
      return this.isConnected()
    }
    return state

  }
  defineModel() {
    cleanupMongooseModel()
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
  read(query = {}) {
    return this._herois.find({ ...query }).lean()
  }
  update(id, item) {
    return this._herois.findOneAndUpdate({ _id: id }, { ...item, _id: id }, { new: true })
  }
  delete(id) {
    return this._herois.deleteOne({ _id: id })
  }
}

module.exports = MongoDB