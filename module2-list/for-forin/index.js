const service=require('./service')

const myMap=Array.prototype((callback)=>{
    const newArraymapped=[]
    for(let i =0;i<this.length-1;i++){
        const resultado=callback(this[i],i)
        
    }
    return resultado
})



async function main(){
    try {
        const results=service.obterPessoas('a')
        const names=results.results.myMap((pessoa,indice)=>{
            return pessoa.names
        })
    } catch (error) {
      console.log('errror',error)  
    }
}

main()