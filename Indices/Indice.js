//  Índices no MongoDB

// Os índices no MongoDB ajudam a melhorar a performance das consultas ao evitar que o banco precise percorrer toda a coleção. 
// No entanto, eles ocupam espaço extra e impactam a performance de escrita.


// Criando um índice simples 
// Índice para o campo "email", permitindo buscas rápidas pelo email do usuário.
db.usuarios.createIndex({email: 1})

// Agora as buscas nesse campo estão otimizadas:
db.usuarios.find({email: "joao@email.com"})

// Criando um índice composto 
// Caso você necessite de uma busca em que você tenha que usar mais de um critério você deve usar os índices compostos
db.usuarios.createIndex({nome: 1, idade: -1})

// Vantagem: Torna consultas como essa muito mais rápidas:
db.usuarios.find({nome: "Carlos"}).sort({idade: -1})

// Índices em Arrays 
// Caso o campo contenha um array e você queira pesquisar nele, também é possivel:
db.pedidos.createIndex({itens: 1})

// Agora, buscas por itens individuais serão otimizadas.
db.pedidos.find({itens: "Laptop"})


// Índices em Campos Textuais
// Se precisamos buscar palavras dentro de um campo de texto, usamos os índices textuais.
db.produtos.createIndex({descricao: "text"})

// Agora, podemos buscar por palavras específicas:
db.produtos.find({ $text: { $search: "notebook" } })


// Índices Geoespaciais 
// Se armazenamos coordenadas geográficas, usamos índices geoespaciais (`2dsphere`).
db.locais.createIndex({localizacao: "2dsphere"})

// Agora podemos buscar locais próximos de um ponto específico.

//  Quanto espaço um índice ocupa?
// Para ver o espaço total ocupado pelos índices:
db.usuarios.totalIndexSize()

// Para detalhar o espaço de cada índice:
db.usuarios.stats().indexSizes
// Exemplo de saída:
// {
//     "_id_": 4096000,
//     "email_1": 1146880,
//     "nome_1_idade_1": 2293760
// }
// O MongoDB "cria automaticamente" um índice no `_id`. Outros índices ocupam espaço adicional.


// Como saber se um índice está sendo usado?
// Use explain() para analisar a performance de uma consulta:
db.usuarios.find({email: "joao@email.com"}).explain("executionStats")
// Se `totalKeysExamined` for 0 e `totalDocsExamined` for o total da coleção, a consulta não está usando o índice.


// Forçando o uso de um índice específico
// Podemos usar `hint()` para obrigar o banco a usar um índice específico:
db.usuarios.find({email: "joao@email.com"}).hint({email: 1}).explain("executionStats")

// Exemplo com um índice composto:
db.pedidos.createIndex({cliente: 1, status: 1})
db.pedidos.find({cliente: "Maria"}).hint({cliente: 1, status: 1}).explain("executionStats")


// Removendo um índice
// Se um índice não estiver sendo usado, podemos remover para economizar espaço:
db.usuarios.dropIndex("email_1")

// Para listar todos os índices existentes:
db.usuarios.getIndexes()




