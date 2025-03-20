//Banco Usado: BancoTeste

//entrando no mongodb
//mongo

//criação ou uso de um banco, caso o banco já exista ela usa o banco informado e caso o banco não exista ele cria uma banco novo
// use BancoTeste

//mostra todos os bancos disponiveis
// show dbs

//mostra as coleções disponiveis
//show collections

//excluir um banco de dados, selecionando o banco e depois inserindo o comando para excluir
//use BancoTeste db.dropDatabase()

//excluir uma coleção completa
db.usuarios.drop()

//excluir os documentos dentro de uma coleção
    db.nome_da_colecao.deleteMany({})

//exluir documentos especificos dentro de uma coleção
    db.nome_da_colecao.deleteMany({status: "inativo"})

//buscar documentos dentro de uma coleção
    db.ususarios.find().pretty()



//criação de uma coleção de usuários
db.createCollection("usuarios")

// inserir um documento com as informações 
db.usuarios.inserOne({nome: "Alice", idade: "25", cidade: "São Paulo"})

//inserir vários documentos com várias informações
db.usuario.insertMany([
    {Nome: "Bob", idade: 30, cidade: "Rio de Janeiro"},
    {nome: "Carlos", idade: 22, cidade: "Belo Horizonte"}
])

//filtrar documentos (exemplo: encontrar usuários com idade 25)
db.usuarios.find({ idade: 25}).pretty();

//filtrar e exibir apenas alguns campos. Retorna apenas o campo nome sem mostrar o id(1 é verdadeiro e 0 é falso)
db.usuarios.find({cidade: "São Paulo"}, {nome: 1, _id: 0})

//atualizar um único documento
db.usuarios.updateOne(
    {nome: "Alice"},
    {$set: {idade: 26}}
)

//atualizar multiplos documentos, onde todos os usuários de São Paulo agora terão o campo estado: "SP"
db.usuarios.updateMany({cidade: "São Paulo"},
    {$set: {estado: "SP"}}
)

//adiciona um novo valor a um array dentro do documento
db.usuarios.updateOne(
    {nome: "Alice"},
    {$push: {hobbies: "leitura"}}
)

//Remover um unico documento
db.usuarios.deleteOne({
    nome: "Carlos"
})

//Remove todos os usuários como menos de 25 anos
db.usuarios.deleteMany({
    idade: {$lt: 25} })
