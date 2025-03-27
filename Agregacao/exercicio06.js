db.cliente.insertMany([{
    "_id": 153,
    "nome": "Alice",
    "email": "alice@example.com"
}])

db.venda.insertMany([
    {
    "_id": 57,
    "cliente_id": 153,
    "data_venda": ISODate("2023-01-15T08:00:00Z"),
    "mes": 1,
    "ano": 2023
    },
    {
    "_id": 58,
    "cliente_id": 153,
    "data_venda": ISODate("2023-02-08T08:00:00Z"),
    "mes": 2,
    "ano": 2023
    }

])

db.item.insertMany([
    {
    "_id": 1,
    "venda_id": 57,
    "produto": "Laptop",
    "quantidade": 2,
    "preco_unitario": 1200
    },
    {
        "_id": 2,
        "venda_id": 58,
        "produto": "Mouse",
        "quantidade": 2,
        "preco_unitario": 300
    }
])

// 1- Contagem de vendas por cliente
// Objetivo: Calcular quantas vendas cada cliente realizou
// Dica: Use $group com cliente_id

db.venda.aggregate([
  {
    $group: { // Agrupando por ID do cliente e somando as vendas
        _id: "$cliente_id",
        total_vendas: {$sum: 1}
    }
  }
])

// 2- Média de vendas por produto:
// Objetivo: Determinar a média de vendas para cada tipo de produto
// Dica: Agrupe por produto e utilize $avg

db.item.aggregate([
    {
        $group: { // Agrupando por produtos e calculando a média de vendas
            _id: "$produto",
            media_venda: {$avg: "$quantidade"}
        }
    }
])

// Listar clientes que compram mais de 5 produtos: 
// Objetivo: Identificar clientes que realizaram grandes pedidos
// Dica: Use $match após $group

// Inserindo usuários para se encaixar no critério
db.cliente.insertOne(
    {
    "_id": 157,
    "nome": "Amelia",
    "email": "amelia@example.com"
    }
)

db.venda.insertOne(
    {
        "_id": 59,
        "cliente_id": 157,
        "data_venda": ISODate("2023-01-22T10:30:00Z"),
        "mes": 3,
        "ano": 2023
    }
)

db.item.insertOne(
    {
        "_id": 3,
        "venda_id": 59,
        "produto": "Teclado",
        "quantidade": 6,
        "preco_unitario": 400
    }
)

db.item.aggregate([
    {
        $group: { // Agrupando por ID da venda e somando a quantidade
            _id: "$venda_id",
            total: {$sum: "$quantidade"}
        }
    },
    {
        $match: { // Filtrando as vendas que possuem mais de 5 produtos
            total: {$gt: 5}
        }
    }
])

// Top 3 produtos mais vendidos:
// Objetivo: Encontrar os produtos com maior número de vendas.
// Dica: Agrupe por produto, some a quantidade e use $sort seguido de $limit

db.item.aggregate([
    {
        $group: { // Agrupando por produto e somando a quantidade vendida de cada produto
            _id: "$produto",
            total_vendas: {$sum: "$quantidade"}
        }
    },
    {
        $sort: {total_vendas: -1} // Ordenando de forma decrescente
    },
    {
        $limit: 3 // Limitando a 3 resultados
    }
])

// Total de vendas por região:
// Objetivo: Se houver um campo região em clientes, calcular o total de vendas por região
// Dica: Utilize o $lookup para unir pedidos e clientes, depois agrupe por região

// Inserindo clientes, vendas e itens que se encaixem no filtro
db.cliente.insertMany([
    {
        "_id": 160,
        "nome": "João",
        "email": "joao@example.com",
        "regiao": "Nordeste"
    },
    {
        "_id": 161,
        "nome": "Alissa",
        "email": "alissa@example.com",
        "regiao": "Sudeste"
    }
])

db.venda.insertMany([
    {
       "_id": 60,
        "cliente_id": 160,
        "data_venda": ISODate("2023-05-10T11:00:00Z"),
        "mes": 5,
        "ano": 2023
    },
    {
        "_id": 61,
         "cliente_id": 161,
         "data_venda": ISODate("2023-07-31T13:30:00Z"),
         "mes": 5,
         "ano": 2023
     }
])

db.item.insertMany([
    {
        "_id": 4,
        "venda_id": 60,
        "produto": "Mousepad",
        "quantidade": 10,
        "preco_unitario": 50
    },
    {
        "_id": 5,
        "venda_id": 61,
        "produto": "Fone de Ouvido",
        "quantidade": 20,
        "preco_unitario": 100
    }
])

db.cliente.aggregate([
    {
        $lookup: { // Realizando uma junção entre as coleções cliente e venda
            from: "venda",
            localField: "_id",
            foreignField: "cliente_id",
            as: "vendas"
        }
    },
    {
        $unwind: "$vendas" // Transformando o array vendas em um documento
    },
    {
        $group: { // Agrupando por região
            _id: "$regiao",
            total_vendas: {$sum: 1}
        }
    }
])