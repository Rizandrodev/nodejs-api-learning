const ContextStrategy = require('./db/strategies/base/contextSatrtegy')
const MongoDB = require('./db/strategies/mongo')
const Postgres = require('./db/strategies/postgres')

const contextMongo = new ContextStrategy(new MongoDB())
contextMongo.create()

const contextPostgres = new ContextStrategy(new Postgres())
contextPostgres.create()
contextPostgres.read()
