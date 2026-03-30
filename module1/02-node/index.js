/*
0 bter um numero
1 Obter o numero de telefone de um usuario a partir do seu Id
2 obter o enderenco do usuario pelo ID

 */


function obterUsuario(callback) {
 setTimeout(() => {
  return callback(null, {
   id: 1,
   nome: 'Aladin',
   dataNascimento: new Date()
  })
 }, 1000)
}

function obterTelefone(idUsuario, callback) {
 setTimeout(() => {
  return callback(null, {
   telefone: '919344785',
   ddd: 244
  })
 }, 2000)
}

function obterEnderenco(idUsuario, callback) {
 setTimeout(() => {
  return callback(null,{
    rua:'Dos medicos',
    numero:14
  })
 }, 2000)

}




// null || '' || 0 ===false
obterUsuario((error, usuario) => {
  if (error) {
    console.log('erro no usuario', error);
    return;
  }

  obterTelefone(usuario.id, (error1, telefone) => {
    if (error1) {
      console.error('deu erro no telefone', error1);
      return;
    }

    obterEnderenco(usuario.id, function resolverEnderenco(error2, enderenco) {
      if (error2) {
        console.error('erro no endereco', error2);
        return;
      }

      console.log(`
        Nome: ${usuario.nome}
        Endereco: ${enderenco.rua} ${enderenco.numero}
        Telefone: (${telefone.ddd})${telefone.telefone}
      `);
    });
  });
});
//const telefone=obterTelefone(user.id)

// console.log('telefone',telefone)