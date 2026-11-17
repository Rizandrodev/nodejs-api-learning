show dbs
use herois 
show collections


db.insert({
  nome:'Flash',
  poder:'velocidade',
  nascimento:'1998-01-01'
})

for(let i=0;i<=10000;i++){
db.insert({
  nome:`clone ${i}`,
  poder:'velocidade',
  nascimento:'1998-01-01'
})}