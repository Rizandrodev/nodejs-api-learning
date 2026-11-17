const ContextStrategy = require('./db/strategies/base/contextSatrtegy')
const MongoDB = require('./db/strategies/mongo')
const Postgres = require('./db/strategies/postgres')

async function main() {
  const contextMongo = new ContextStrategy(new MongoDB())
  await contextMongo.create({ nome: 'Flash', poder: 'Velocidade' })

  const postgres = new Postgres()
  await postgres.connect()
  await postgres._herois.sync()

  const contextPostgres = new ContextStrategy(postgres)
  await contextPostgres.create({ nome: 'Flash', poder: 'Velocidade' })
  console.log(await contextPostgres.read())
}

main()
