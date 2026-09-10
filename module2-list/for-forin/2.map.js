const service=require('./service')

async function main(params) {
    try {
        const results=await service.obterPessoas('a')
//        const names=[]
        // results.results.forEach((item)=>{
        //     names.push(item.name)
        
        const names= results.results.map((pessoa)=> pessoa.name)
        console.log('names',names)
    } catch (error) {
       console.log('Erro',error) 
    }
    
}
main()