require('dotenv').config()

const Sequelize = require('sequelize')
const Icrud = require('./interfaces/interfaceCrud')

class Postgres extends Icrud {
  constructor() {
    super()
    this._driver = null
    this._herois = null
  }

  async isConnected() {
    try {
      await this._driver.authenticate()
      return true
    } catch (error) {
      console.log('erro ao conectar no Postgres:', error.message)
      return false
    }
  }

  async create(item) {
    const { dataValues } = await this._herois.create(item)
    return dataValues
  }

  async read(query = {}) {
    return this._herois.findAll({ where: query, raw: true })
  }

  async connect() {
    this._driver = new Sequelize(
      process.env.POSTGRES_DB,
      process.env.POSTGRES_USER,
      process.env.POSTGRES_PASSWORD,
      {
        host: process.env.POSTGRES_HOST || 'localhost',
        port: Number(process.env.POSTGRES_PORT) || 5432,
        dialect: process.env.POSTGRES_DIALECT || 'postgres',
        quoteIdentifiers: false,
        operateAliases: false
      }
    )
   await this.defineModel()
  }

 async defineModel() {
    this._herois = this._driver.define('herois', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      poder: {
        type: Sequelize.STRING,
        allowNull: false
      }
    }, {
      tableName: 'TB_HEROES',
      freezeTableName: false,
      timestamps: false
    })

    return this._herois
  }
}

module.exports = Postgres
