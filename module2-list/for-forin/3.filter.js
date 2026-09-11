const { obterPessoas } = require('./service')

Array.prototype.meufilter=function (callback){

for(index in this){
  const item=this[index]
  const list=[]
  const result=callback(item,index ,this)

  if(!result) continue;
  list.push(item)
  return list
}
}
async  function main() {
  try {
    const { results } = await obterPessoas('a')
    // const familiaLars = results.filter((item) => {
    //   //por padrao precisa retorna um booleano
    //   //para informar se deve manter ou reover da listas
    //   // false = remove da lista
    //   //true mantem
    //   // nao encontrou = -1
    //   //encontriou =posicaoNoArray

    //   const result = item.name.toLowerCase().indexOf('lars') ===-1
    //   return result
    // })
   

    const familiaLars=results.meufilter((item,index,list)=>{
      console.log(`index: ${index}`,list.length)
      return item.name.toLowerCase().indexOf('lars') !==-1
    })
    const names=familiaLars.map((pessoa)=>pessoa.name)
    console.log(names)
  } catch (error) {
    console.log('erro', error)
  }
}

main()
