//Banco Usado: MeuBanco
db.produtos.insertMany([
    {
        "_id": 1,
        "nome": "Notebook Dell",
        "categoria": "Eletrônicos",
        "preco": 4500,
        "estoque": 15,
        "avaliacao": 4.7
    },
    {
        "_id": 2,
        "nome": "Smartphone Samsung",
        "categoria": "Eletrônicos",
        "preco": 2500,
        "estoque": 30,
        "avaliacao": 4.5
    }
])

db.produtos.insertOne({
    "_id": 3,
    "nome": "Cadeira Gamer",
    "categoria": "Moveis",
    "preco": 1200,
    "estoque": 10,
    "avaliacao": 4.8 
})

//Operadores de comparação 

//$eq(igual a): operador retorna documentos cujo o valor de um campos especifico seja igual ao valor fornecido
     db.produtos.find({"preco": {"$eq": 2500 } }).pretty()

//$ne(diferente de): retorna documentos cujo valor do campo seja diferente do valor especificado
    db.produtos.find({"preco": {"$ne": 4500 } }).pretty()

//$gt(maior que): retorna o documento cujo o valor de um campo seja maior que o especificado
    db.produtos.find({"preco": {"$gt": 2000 } }).pretty()

//$lt(menor que): retorna o documento cujo o valor de um campo seja menor que o valor especificado
    db.produtos.find({"preco": {"$lt": 3000 } }).pretty()

//$gte e $lte(maior ou igual / menor ou igual): São as váriações anteriores, incluindo valores iguais ao limite definido
    db.produtos.find({"preco": {"$gte": 1000, "$lte": 3000 } }).pretty()


//Operadores Lógicos

//$and: operador $and exige que todas as condições especificas seja verdadeiras
    db.produtos.find({
        "$and": [
            {"categoria": "Eletrônicos"},
            {"preco": {"$gt": 3000}}
        ]
    }).pretty()

//$or: retorna documentos que satisfaçam pelo menos uma das condições especificadas
    db.produtos.find({
        "$or": [
            {"categoria": "Eletrônicos"},
            {"preco": {"$gt": 4000}}
        ]
    }).pretty()

//$not: operador que nega uma condição especifica, nesse está negando valores maior que 3000
    db.produtos.find({"preco": {
        "$not": {"$gt": 3000}
    }}).pretty()

//$nor: oposto de $or, exclui documentos que  satisfaçam qualquer uma das condições listadas
    db.produtos.find({
        "$nor": [
            {"categoria": "Eletrônicos"},
            {"preco": {"$gt": 4000}}
        ]
    }).pretty()


//Operadores de Elemento

//$exists: verifica se uma campo está presente ou não em um documento
    db.produtos.find({ "avaliacao": { "$exists": true}
    }).pretty()

//$type: filtra documentos com base no tipo de dado armazenado em um campo
    db.produtos.find({
        "preco": {"$type": "double"} //double é considerado int
    }).pretty()

//Exercicios
//1-) utilize o operador $gte para encontrar todos os produtos com preço maior ou igual a 2000
    db.produtos.find({"preco": {"$gte": 2000}}).pretty()

//2-) Filtre os produtos que pertencem a categoria "Moveis" e possuem avaliação superior a 4.5 usando $and
    db.produtos.find({
        "$and": [
            {"categoria": "Moveis"},
            {"avaliacao": {"$gt": 4.5}}
        ]
    }).pretty()

//3-) Use $or para retornar todos os produtos que custam menos de 2000 ou tem estoque maior que 20
        db.produtos.find({
            "$or": [
                {"preco": {"$lt": 2000}},
                {"estoque": {"$gt": 20}}
            ]
        }).pretty()

//4-) Escreva uma consulta que retorne apenas os produtos que possuem o campo avaliação
        db.produtos.find({ "avaliacao": {"$exists": true}}).pretty()

//5-) Utilize $nor para excluir da busca os produtos da categoria "Eletrônicos" e aqueles com preço maior que 3000
    db.produtos.find({
        "$nor": [
            {"categoria": "Eletrônicos"},
            {"preco": {"$gt": 3000}}
        ]
    }).pretty()