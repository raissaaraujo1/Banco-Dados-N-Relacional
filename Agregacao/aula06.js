//Como Juntar duas coleções?
//No MongoDB é possivel usar referencias ou incoroporações de documentos para relacionar duas coleções, mas a escolha entre esses dois métodos depende do caso de uso e da necessidade de normalização dos dados.

//COmo juntar duas coleções: embedding
// - Como este método é possive guardar o documentos que você pretende relacionar no próprio documentos principal
// -Esse método é util para se usar quando os dados relacionados são acessados em sua grande maioria juntos e deseja evitar essas consultas separadas
//Exemplo:
{
    "_id": ObjectId("id gerado pelo mongo"),
    "item": "Laptop",
    "price": 1200,
    "user": {
        "name": "Alice"
    }
}
//Aqui em vez de armazenar o id do usuário ona coleção "orders" você armazena as informações do usuário


//VISÃO GERAL SOBRE AGREGAÇÕES
// $lookup : uma das ferramentas utilizadas para relacionar duas coleções entre si
// Agregação: função para "juntar" uma coleção em outra

//Como juntar duas coleções usando o reference
//coleção de users
{
    "_id": ObjectId("código do id"),
    "name": "Alice"
}
//coleção de orders
{
    "_id": ObjectId("código do id"),
    "item": "Laptop",
    "price": 1200,
    "user-_id": ObjectId("código do id")
}
//procurando as ordens e o usuário
db.orders.findOne({_id: ObjectId("")})
db.users.findOne({_id: ObjectId("")})

db.orders.aggregate([
    {
        $lookup: {
            from: "users",
            localfield: "user_id",
            foreignField: "_id",
            as: "user_info"
        }
    }
])

//Como juntar duas coleções: embbed ou reference
//Comparação:
// - Refrencias são uteis quando você tem uma estrutura de dados mais complexa e deseja normalizar os dados para evitar duplicações
// - Incorporação é ideal para dados que não mudam frequnetemente e que são acessados juntos, o que melhora o desempenho de leitura

//Qual a abordagem escolher?
//Depende de sua necessidade. Caso você usa frequentemente a consulta de dados de uma entidade e os dados relacionados a ela é mais indicado que você use a incorporação
//Mas caso os seus dados mudem frequentemente ou são acessados separadamente, o uso das referencias pode ser preferivel

//Uso do Operador $GROUP
// $group: agrupa documentos 

db.orders.aggregate([
    {
        $group: {
            _id: "$product_id", //Agrupa pelos IDs de produtos
            total_orders: {$sum: 1}, //Conta o número de pedidos
            total_quantity: {$sum: "$quantity"} // Soma a quantidade de cada pedido 
        }
    }
])

//Visão Geral de agragações no mongoDB
//Agregação: processo que trnaforma e combina dados de diversos documentos para produzir resultados agregados, como totais, medias, contagens...
//As agregações manuseam operações complexas e que envolvem muitas etapas de processamento


//Pipeline de Agregação
// - A pipeline de agregação é a sequência de estágios que os documentos percorre durante o processo de agragação. Cada Estágio aplica uma opração especifica entre os documentos e passa o resultado para o próximo estágio
db.collection.aggregate([
    {estagio1},
    {estagio2},
    {estagio3}
    //...
])

//Fluxo de dados na Pipeline
//Entrada:
// - A Pipleine recebe os documentos da coleção especificada
//Processamento:
// - Cada estágio processa os documentos conforme sua função
//Saida:
// - O resultado Final é retornado após todos os estágios terem sido aplicados
//Exemplo:
db.vendas.aggregate([
    {$match: {ano: 2023}}, //filtra os documentos
    {$group: {_id: "$mes", total: { $sum: "$valor"}}}, //agrupa e soma
    {$sort: {total: -1}} //ordena os resultados
])




//Estágios de agragação
//Operadores que comões a pipeline. Cada Estagio realiza uma transformações nos documentos e passa o resultado para o próximo estágio

// $match: filtra documentos de acordos com os critérios espcificados, semelhante ao WHERE no SQL
db.vendas.aggregate([
    { $match: {ano: 2023}}, 

])

// $project permite selecionar, incluir ou excluir campos especificos nos documentos resultantes, pode ser usado para criar novos campos ou tranformar dados
db.vendas.aggregate([
    {$project: {nome: 1, valo: 1, _id:0}}
])

// $sort: ordena os documentos com base em um ou mais campos
db.vendas.aggregate([
    {$sort: { valor: -1}} // -1 forma decrescente / 1 forma crescente
])

//$limit: restringe o número de documentos que irão passar para os estágios seguintes
//$skip: ignora um número especificado nos documentos
db.vendas.aggregate([
    {$sort: {valor: -1}},
    {$limit: 5}
])

// $unwind: destrutura uma array, criando um documentos para cada lemento do array
db.pedidos.aggregate([
    { $unwind: "$itens"}
])

//$facet: permite executar multiplas pipelines de agregação em paralelo e combinar resultados
db.vendas.aggregate([
    {
        $facet: {
            total_vendas: [{ $count: "count"}],
            soma_total: [{ $group: {_id: null, total: {$sum: $valor}}}]
        }
    }
])

//$bucket: Agrupa documentos em interavalos predefinidos
//$bucketAuto: Agrupa documentos em um numeros especificado de buckets automaticamente
db.vendas.aggregate([
    {
        $bucket: {
            groupBy: "$valor",
            boundaries: [0, 100, 200, 300],
            default: "Mais de 300",
            output: {total_vendas: {$sum: 1}, soma_valores: {$sum: "$valor"}}
        }
    }
])

//$addFields: Adiciona novos campos aos documentos
// $set: Similar ao $addFields, mas também pode modificar compas existentes
db.vendas.aggregate([
    {
        $addFields: {
            total: {$multiply: ["$quantidade", "preco_unitario"]}
        }
    }
])

//$count: adiciona um campo como numero total de documentos que passaram pelo estagio anterior
db.vendas.aggregate([
    {$count: "total_vendas"}
])

//Como testar?
db.vendas.aggregate([
    {$match: {ano: 2023}},
    {$group: {_id: "$mes", total_vendas: {$sum: "$valor"}}},
    {$sort: {total_vendas: -1}}
]).explain("executionStats")

//Operadores de agregação
// -$sum: Soma dos valores
// -$avg: Calcular a média
// -$min: encontra o valor minimo
// -$max: encontra o valor máximo
// -$first: retorna o primeiro valor
// -$last: retorna o ultimo valor

db.vendas.aggregate([
    {$group: {_id: "$mes", media_vendas: {$avg: "$valor"}}}
])

//Operadores condicionais
// Permitem realizar operações condicionais semelhantes a estruturas if0else:
// - $cond: estrutra condicional
// - $ifNull: Retorna um valor se o campo for nulo ou indefinido
// - $switch: Implementa uma série de condições

//Exemplo Operador de agragação:
db.vendas.aggregate([
    { $group: {_id: "$mes", media_vendas: {$avg: "$valor"}}}
])

//Operadores que permitem realizar operações semelhantes a estrutura if-else
// -$cond: Estrutura condicional
// -$ifNull: Retorna um valo se o campo for nulo ou indefinido
// -$switch: Implementa uma séria de condições
//Exemplo:
db.vendas.aggregate([
    {
        $addFields: {
            acima_da_media:{
                $cond: {if: {$gt: [ "$valor", 1000]}, then: true, else: false}
            }
        }
    }
])

//Operadores de um array
// -$push: Adiciona elementos a um array.
// - $addToSet: Adiciona elementos unicos em um array
// - $filter: Filtra elementos de um array
// - $map: aplica uma experassão a cada elemento de um array
// - $map: aplica uma expressão a cada elemento de um array
// - $reduce: reduz um array a um único valor.
//Exemplo:
db.pedidos.aggregate([
    {
        $project: {
            itens_filtrados: {
                $filter: {
                    input: "$itens",
                    as: "item",
                    cond: {$gt: ["$$item.quantidade", 2]}
                }
            }
        }
    }
])


