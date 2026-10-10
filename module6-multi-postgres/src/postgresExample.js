require('dotenv').config()

const Sequelize=require('sequelize')

const driver=new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host:process.env.POSTGRES_HOST || 'localhost',
    dialect:process.env.POSTGRES_DIALECT || 'postgres',
    quoteIdentifiers:false,
    operateAliases:false
  }
)
async function main() {
  const Herois = driver.define('herois', {
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
  },{
    tableName:'TB_HEROES',
    freezeTableName:false,
    timestamps:false

  })

  await Herois.sync()
  await Herois.create({ nome: 'Flash', poder: 'Velocidade' })
  const result=await Herois.findAll({raw:true})
  console.log(result)
}

main()