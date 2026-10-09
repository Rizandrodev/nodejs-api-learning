const assert = require('assert')
const postgres = require('../db/strategies/postgres')
const Context = require('../db/strategies/base/contextSatrtegy')

const context = new Context(new postgres())

describe('Postgres Connection', function () {
  this.timeout(10000)

  it('deve conectar ao Postgres', async function () {
    const result = await context.isConnected()
    assert.equal(result, true)
  })
})
