//Modificando a estrutura de documentos

db.users.insertMany([
    {
        _id:1,
        username: "joao",
        age: 24,
        active: true,
        premium: false,
        hobbies: ["reading", "soccer"],
        tasks: [{title: "Study MongoDB", status: "pending"}]
    },

    {
        _id: 2,
        username: "maria",
        age: 30,
        active: false,
        premium: true,
        hobbies: ["cooking", "yoga"],
        tasks: [{title: "Complete project", status: "done"}]
    },

    {
        _id: 3,
        username: "carlos",
        age: 35,
        active: true,
        premium: false,
        hobbies: ["gaming", "music"],
        tasks: [{title: "Write report", status: "pending"}]
    }

]);

//atualiza apenas um documento que corresponde ao filtro

db.users.updateOne(
    {username: "joao"},
    { $set: { age: 25 }}
);
//o usuário joão agora tem 25 anos

//$set: atualiza todos os documentos que correspondem ao filtro
db.users.updateMany(
    {active: true},
    { $set: {premium: true}}
)
//todos os usuários agora são premium

//substitui um documento inteiro por um novo 

db.users.replaceOne(
    {username: "maria"},
    {_id: 2, username: "maria", age: 31, active: true, premium: false, hobbies: []}
)
//maria foi completamente substituida e perdeu suas tasks


//$unset: remove um campo
db.users.updateOne(
    {username: "carlos"},
    { $unset: { premium: "" }}
)

//$rename: renomeia um campo
db.users.updateOne(
    {username: "carlos"},
    { $rename: { "age": "yearsOld" }}
)

//OPERADORES MÁTEMÁTICOS

// $inc - incrementa um valor

db.users.updateOne(
    {username: "joao"},
    {$inc : {age: 1}}
)

// $mul - multiplica um valor
db.users.updateOne(
    {username: "maria"},
    { $mul: { age: 2}}
)
//multiplicou por 2 a idade da ana

// $min - diminui um valor
db.users.updateOne(
    {username: "joao"},
    { $min: { age: 23}}
)
//se a idade de joao for maior que 23 ela é reduzida pra 23

// $max - adiona um valor
db.users.updateOne(
    {username: "maria"},
    { $max: { age: 63}}
)
// se a idade de maria foi menor que 35 ela é aumentada para 35

// $push - adiciona um elemento a um array
db.users.updateOne(
    {username: "joao"},
    { $push: { hobbies: "guitar"}}
)
//guitar é adicionado ao array hobbies de joao

// $pop - remove o utlimo item do array
db.users.updateOne(
    {username: "maria"},
    { $pop: { hobbies: -1 }}
)

//remover um elemento especifico 
// $pull - remove elementos especificos 
db.users.updateOne(
    {username: "carlos"},
    { $pull: { hobbies: "gaming" }}
)

// $addToSet - adiciona um item se ele não existir
db.users.updateOne(
    {username: "joao"},
    { $addToSet: { hobbies: "chess" }}
)
//chess só será adiconado no array hobbies se ainda não existir 

//$each - Adiciona multiplos elementos
db.users.updateOne(
    {username: "joao"},
    { $push: { hobbies: { $each : [ "coding", "music"]}}}
)

//eliminando um usuario
db.usuarios.deleteOne({
    nome: "joao"
})

db.users.insertOne(
{
    _id:1,
    username: "joao",
    age: 24,
    active: true,
    premium: false,
    hobbies: ["reading", "soccer"],
    tasks: [{title: "Study MongoDB", status: "pending"}]
}
)