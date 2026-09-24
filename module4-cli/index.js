const { Command } = require('commander')
const Database = require('./database.js')
const Heroi = require('./heroi.js')

const program = new Command()

async function main() {
  program
    .version('1.0.0')
    .option('-n, --nome <value>', 'Nome do herói')
    .option('-p, --poder <value>', 'Poder do herói')
    .option('-i --id <value>','Id do Heroi')
    .option('-c, --cadastrar', 'Cadastrar um herói')
    .option('-l, --listar', 'listar um herói')
    .option('-r, --remover ', 'remover um herói')
    .option('-a, --actualizar <value>', 'remover um herói')


    .parse(process.argv)

  const options = program.opts()
  const heroi = new Heroi(options)

  try {
    if (options.cadastrar) {
      delete heroi.id
      const result = await Database.cadastrar(heroi)
      if (!result) {
        console.log("Herois nao foi Cadastrado!")
        return;
      }
      console.log("Herois Cadastardo com sucesso")
    }
    if (options.listar) {
      const result = await Database.listar()
      console.log(result)
      return;
    }
    if (options.remover) {
      constresult = await Database.remover(heroi.id)

      if (!heroi.id) {
        console.log('Error ao remover user')
        return;
      }
      console.log("Usuario removido com sucesso ")

    }if(options.actualizar){
      const idActualizar=parseInt(options.actualizar)
      delete heroi.id
      //remover tdas as chaves que tiverem com undifnerd
      const dado=JSON.stringify(heroi)
      const heroisACtualizar=JSON.parse(dado)
      const result =await Database.actualizar(idActualizar,heroisACtualizar)
      if(!result){
        console.error('Nao foi posssivel Actualizar Heroi')
        return;   
      } console.log("Heroi Actualizado com sucesso")
      
    }
  } catch (error) {
    console.error('error', error)
  }
}

main()