db.animal.insertMany([ 
    { "_id": 1, "nome": "Rex", "idade": 3, "tipo": "Cachorro", "raça": 
  "Labrador", "peso": 25.0, "dono_id": 1 }, 
    { "_id": 2, "nome": "Mimi", "idade": 2, "tipo": "Gato", "raça": 
  "Siamês", "peso": 4.5, "dono_id": 2 }, 
    { "_id": 3, "nome": "Bob", "idade": 5, "tipo": "Cachorro", "raça": 
  "Poodle", "peso": 7.0, "dono_id": 3 }, 
    { "_id": 4, "nome": "Nina", "idade": 1, "tipo": "Cachorro", "raça": 
  "Bulldog", "peso": 15.0, "dono_id": 4 }, 
    { "_id": 5, "nome": "Luna", "idade": 4, "tipo": "Gato", "raça": 
  "Persa", "peso": 5.0, "dono_id": 5 }, 
    { "_id": 6, "nome": "Thor", "idade": 2, "tipo": "Cachorro", "raça": 
  "Pastor Alemão", "peso": 30.0, "dono_id": 6 }, 
    { "_id": 7, "nome": "Bella", "idade": 3, "tipo": "Gato", "raça": 
  "Maine Coon", "peso": 6.8, "dono_id": 7 }, 
    { "_id": 8, "nome": "Zeus", "idade": 6, "tipo": "Cachorro", "raça": 
  "Beagle", "peso": 9.0, "dono_id": 8 }, 
    { "_id": 9, "nome": "Max", "idade": 2, "tipo": "Cachorro", "raça": 
  "Chihuahua", "peso": 2.5, "dono_id": 9 }, 
    { "_id": 10, "nome": "Mia", "idade": 3, "tipo": "Gato", "raça": 
  "Angorá", "peso": 4.0, "dono_id": 10 } 
  ]); 

  db.dono.insertMany([ 
    { "_id": 1, "nome": "Carlos", "telefone": "123456789", "endereco": 
  "Rua A" }, 
    { "_id": 2, "nome": "Ana", "telefone": "987654321", "endereco": "Rua B" }, 
    { "_id": 3, "nome": "Bruna", "telefone": "564738291", "endereco": 
  "Rua C" }, 
    { "_id": 4, "nome": "Eduardo", "telefone": "918273645", "endereco": 
  "Rua D" }, 
    { "_id": 5, "nome": "Fernanda", "telefone": "627364839", "endereco": 
  "Rua E" }, 
    { "_id": 6, "nome": "Gabriel", "telefone": "516273849", "endereco": 
  "Rua F" }, 
    { "_id": 7, "nome": "Helena", "telefone": "829364718", "endereco": 
  "Rua G" }, 
    { "_id": 8, "nome": "Igor", "telefone": "819273645", "endereco": 
  "Rua H" }, 
    { "_id": 9, "nome": "Joana", "telefone": "917283645", "endereco": 
  "Rua I" }, 
    { "_id": 10, "nome": "Luciana", "telefone": "614738291", "endereco": 
  "Rua J" } 
  ]); 

  db.agendamento.insertMany([ 
    { "_id": 1, "animal_id": 1, "data_agendamento": ISODate("2023-10-01"), "servico": "Banho" }, 
    { "_id": 2, "animal_id": 2, "data_agendamento": ISODate("2023-09-15"), "servico": "Tosa" }, 
    { "_id": 3, "animal_id": 3, "data_agendamento": ISODate("2023-08-10"), "servico": "Banho e Tosa" }, 
    { "_id": 4, "animal_id": 4, "data_agendamento": ISODate("2023-09-01"), "servico": "Banho" }, 
    { "_id": 5, "animal_id": 5, "data_agendamento": ISODate("2023-07-05"), "servico": "Tosa" },
    { "_id": 6, "animal_id": 6, "data_agendamento": ISODate("2023-06-20"), "servico": "Banho" }, 
    { "_id": 7, "animal_id": 7, "data_agendamento": ISODate("2023-10-05"), "servico": "Banho e Tosa" }, 
    { "_id": 8, "animal_id": 8, "data_agendamento": ISODate("2023-05-01"), "servico": "Tosa" }, 
    { "_id": 9, "animal_id": 9, "data_agendamento": ISODate("2023-04-10"), "servico": "Banho" }, 
    { "_id": 10, "animal_id": 10, "data_agendamento": ISODate("2023-03-20"), "servico": "Banho e Tosa" } 
    ]);
 
// 1) Calcular o peso médio dos animais que utilizam cada tipo de serviço:
// Utilize $lookup para associar os agendamentos com os animais e depois agrupe os
// animais por serviço para calcular o peso médio usando $avg.

db.agendamento.aggregate([
  {
    // Relaciona cada agendamento ao respectivo animal
    $lookup: { from: "animal", localField: "animal_id", foreignField: "_id", as: "animal_agendamento" }
  },
  {
    // Desestrutura o array de animais resultante do lookup
    $unwind: "$animal_agendamento"
  },
  {
    // Agrupa por tipo de serviço e calcula o peso médio dos animais
    $group: { _id: "$servico", peso_medio: { $avg: "$animal_agendamento.peso" } }
  },
  {
    // Arredonda o peso médio para duas casas decimais e projeta o campo "servico"
    $project: { servico: "$_id", peso_medio: { $round: ["$peso_medio", 2] }, _id: 0 }
  }
]);

// 2) Contar o número de agendamentos por tipo de animal:
// Faça um lookup entre agendamentos e animais e agrupe por tipo (Cachorro ou Gato),
// contando quantos agendamentos foram feitos para cada tipo.

db.animal.aggregate([
  {
    // Associa cada animal aos seus agendamentos
    $lookup: { from: "agendamento", localField: "_id", foreignField: "animal_id", as: "agendamento_animal" }
  },
  {
    // Desestrutura o array de agendamentos
    $unwind: "$agendamento_animal"
  },
  {
    // Agrupa por tipo de animal (ex: Gato ou Cachorro) e conta os agendamentos
    $group: { _id: "$tipo", numero_agendamentos: { $sum: 1 } }
  },
  {
    // Projeta o nome do tipo como "tipo" e oculta o campo _id
    $project: { tipo: "$_id", numero_agendamentos: 1, _id: 0 }
  }
]);

// 3) Listar os donos que possuem animais agendados para "Banho e Tosa":
// Relacione os agendamentos com animais e, em seguida, com os donos, filtrando apenas
// agendamentos do tipo "Banho e Tosa". Liste os donos que possuem animais agendados para este serviço.

db.animal.aggregate([
  {
    // Associa os agendamentos aos animais
    $lookup: { from: "agendamento", localField: "_id", foreignField: "animal_id", as: "agendamentos_animal" }
  },
  {
    // Desestrutura o array de agendamentos
    $unwind: "$agendamentos_animal"
  },
  {
    // Relaciona os animais aos respectivos donos
    $lookup: { from: "dono", localField: "dono_id", foreignField: "_id", as: "dono_animal" }
  },
  {
    // Desestrutura o array de donos
    $unwind: "$dono_animal"
  },
  {
    // Filtra apenas os agendamentos do serviço "Banho e Tosa"
    $match: { "agendamentos_animal.servico": "Banho e Tosa" }
  },
  {
    // Agrupa pelo nome do dono para evitar duplicatas
    $group: { _id: "$dono_animal.nome" }
  },
  {
    // Projeta apenas o nome, ocultando o _id
    $project: { nome: "$_id", _id: 0 }
  }
]);

// 4) Calcular a idade média dos animais por serviço agendado:
// Utilize $lookup entre agendamentos e animais e, em seguida, agrupe os animais
// pelo serviço agendado, calculando a média das idades de cada grupo.

db.animal.aggregate([
  {
    // Associa os agendamentos aos animais
    $lookup: { from: "agendamento", localField: "_id", foreignField: "animal_id", as: "animal_agendamento" }
  },
  {
    // Desestrutura o array de agendamentos
    $unwind: "$animal_agendamento"
  },
  {
    // Agrupa por serviço e calcula a idade média dos animais
    $group: { _id: "$animal_agendamento.servico", media_idade: { $avg: "$idade" } }
  },
  {
    // Projeta o nome do serviço e arredonda a idade média
    $project: { servico: "$_id", idade_media: { $round: ["$media_idade", 2] }, _id: 0 }
  }
]);

// 5) Contar quantos donos possuem mais de um animal:
// Use $group na coleção animais para contar o número de animais por dono_id e, em seguida,
// filtre os donos que possuem mais de um animal.

// Inserindo animais extras para testes (donos com múltiplos animais)
db.animal.insertMany([
  { "_id": 11, "nome": "Titinho", "idade": 2, "tipo": "Gato", "raça": "Frajola", "peso": 2.5, "dono_id": 1 },
  { "_id": 12, "nome": "Vicky", "idade": 7, "tipo": "Cachorro", "raça": "Dálmata", "peso": 7.5, "dono_id": 5 },
  { "_id": 13, "nome": "Lico", "idade": 3, "tipo": "Gato", "raça": "Sphynx", "peso": 3.5, "dono_id": 8 }
]);

db.animal.aggregate([
  {
    // Relaciona os animais aos seus donos
    $lookup: { from: "dono", localField: "dono_id", foreignField: "_id", as: "dono_animal" }
  },
  {
    // Desestrutura o array de donos
    $unwind: "$dono_animal"
  },
  {
    // Agrupa pelo dono, conta a quantidade de animais e armazena o nome
    $group: {
      _id: "$dono_animal._id",
      nome: { $first: "$dono_animal.nome" },
      quantidade_animais: { $sum: 1 }
    }
  },
  {
    // Filtra apenas os donos com mais de um animal
    $match: { quantidade_animais: { $gt: 1 } }
  },
  {
    // Projeta os campos relevantes
    $project: { dono_id: "$_id", nome: 1, quantidade_animais: 1, _id: 0 }
  }
]);

