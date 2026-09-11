const { obterPessoas } = require('./service')


Array.prototype.meuReduce = function (callback, valorInicial) {
  let valorFinal =
    valorInicial !== undefined
      ? valorInicial
      : this[0]

  let inicio = valorInicial !== undefined ? 0 : 1

  for (let index = inicio; index < this.length; index++) {
    valorFinal = callback(
      valorFinal,
      this[index],
      index,
      this
    )
  }

  return valorFinal
}

async function main(params) {
  try {
    const { results } = await obterPessoas('a')
    const pesos = results.map(item => parseInt(item.height))
    console.log('pesos', pesos)
    // const total = pesos.reduce((anterior, proximo) => {
    //   return anterior + proximo;
    // })
    const minhaLista=[
      ['Rizandro','dev'],
      ['Hacking','Pentest ']
    ]
    const total = minhaLista.meuReduce((anterior,proximo)=>{
      return anterior.concat(proximo)
    }, []).join(',')

    console.log('total', total)
  } catch (error) {
    console.log('error', error)
  }
}

main()
