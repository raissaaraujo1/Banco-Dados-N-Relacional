db.pacientes.insertMany([ 
    { "_id": 1, "nome": "Ana", "idade": 45, "sexo": "F", "endereço": 
  "Rua A", "telefone": "123456789", "diagnóstico": "Diabetes" }, 
    { "_id": 2, "nome": "Bruno", "idade": 32, "sexo": "M", "endereço": 
  "Rua B", "telefone": "987654321", "diagnóstico": "Hipertensão" }, 
    { "_id": 3, "nome": "Carlos", "idade": 60, "sexo": "M", "endereço": 
  "Rua C", "telefone": "564738291", "diagnóstico": "Doença Cardíaca" }, 
    { "_id": 4, "nome": "Daniela", "idade": 28, "sexo": "F", "endereço": 
  "Rua D", "telefone": "918273645", "diagnóstico": "Asma" }, 
    { "_id": 5, "nome": "Eduardo", "idade": 54, "sexo": "M", "endereço": 
  "Rua E", "telefone": "627364839", "diagnóstico": "Diabetes" }, 
    { "_id": 6, "nome": "Fernanda", "idade": 38, "sexo": "F", 
  "endereço": "Rua F", "telefone": "516273849", "diagnóstico": 
  "Hipertensão" }, 
    { "_id": 7, "nome": "Gabriel", "idade": 49, "sexo": "M", "endereço": 
  "Rua G", "telefone": "829364718", "diagnóstico": "Doença Pulmonar" }, 
    { "_id": 8, "nome": "Helena", "idade": 34, "sexo": "F", "endereço": 
  "Rua H", "telefone": "819273645", "diagnóstico": "Asma" }, 
    { "_id": 9, "nome": "Igor", "idade": 22, "sexo": "M", "endereço": 
  "Rua I", "telefone": "917283645", "diagnóstico": "Alergia" }, 
    { "_id": 10, "nome": "Joana", "idade": 61, "sexo": "F", "endereço": 
  "Rua J", "telefone": "614738291", "diagnóstico": "Doença Cardíaca" } 
  ]); 

  db.medicos.insertMany([ 
    { "_id": 1, "nome": "Dr. Pedro", "especialidade": "Cardiologia", 
  "telefone": "999999999", "salário": 12000 }, 
    { "_id": 2, "nome": "Dra. Mariana", "especialidade": 
  "Endocrinologia", "telefone": "888888888", "salário": 10000 }, 
    { "_id": 3, "nome": "Dr. Ricardo", "especialidade": "Pneumologia", 
  "telefone": "777777777", "salário": 11000 }, 
    { "_id": 4, "nome": "Dra. Luciana", "especialidade": "Cardiologia", 
  "telefone": "666666666", "salário": 11500 }, 
    { "_id": 5, "nome": "Dr. Felipe", "especialidade": "Pediatria", 
  "telefone": "555555555", "salário": 9500 }, 
    { "_id": 6, "nome": "Dra. Beatriz", "especialidade": "Dermatologia", 
  "telefone": "444444444", "salário": 10500 }, 
    { "_id": 7, "nome": "Dr. Marcelo", "especialidade": "Pediatria", 
  "telefone": "333333333", "salário": 9800 }, 
    { "_id": 8, "nome": "Dra. Gabriela", "especialidade": 
  "Endocrinologia", "telefone": "222222222", "salário": 10200 }, 
    { "_id": 9, "nome": "Dr. André", "especialidade": "Cardiologia", 
  "telefone": "111111111", "salário": 11800 }, 
    { "_id": 10, "nome": "Dra. Paula", "especialidade": "Neurologia", 
  "telefone": "000000000", "salário": 12500 } 
  ]);

  db.internacoes.insertMany([ 
    { "_id": 1, "paciente_id": 1, "medico_id": 1, "data_internacao": 
  ISODate("2023-10-01"), "data_alta": ISODate("2023-10-10"), "motivo": 
  "Tratamento de Diabetes" }, 
    { "_id": 2, "paciente_id": 2, "medico_id": 2, "data_internacao": 
  ISODate("2023-09-15"), "data_alta": ISODate("2023-09-20"), "motivo": 
  "Controle de Hipertensão" }, 
    { "_id": 3, "paciente_id": 3, "medico_id": 4, "data_internacao": 
  ISODate("2023-08-10"), "data_alta": ISODate("2023-08-20"), "motivo": 
  "Tratamento Cardíaco" }, 
    { "_id": 4, "paciente_id": 4, "medico_id": 6, "data_internacao": 
  ISODate("2023-09-01"), "data_alta": ISODate("2023-09-10"), "motivo": 
  "Tratamento de Asma" },
  { "_id": 5, "paciente_id": 5, "medico_id": 2, "data_internacao": 
    ISODate("2023-07-05"), "data_alta": ISODate("2023-07-15"), "motivo": 
    "Controle de Diabetes" }, 
    { "_id": 6, "paciente_id": 6, "medico_id": 8, "data_internacao": 
    ISODate("2023-06-20"), "data_alta": ISODate("2023-06-25"), "motivo": 
    "Controle de Hipertensão" }, 
    { "_id": 7, "paciente_id": 7, "medico_id": 3, "data_internacao": 
    ISODate("2023-10-05"), "data_alta": ISODate("2023-10-15"), "motivo": 
    "Tratamento Pulmonar" }, 
    { "_id": 8, "paciente_id": 8, "medico_id": 6, "data_internacao": 
    ISODate("2023-05-01"), "data_alta": ISODate("2023-05-10"), "motivo": 
    "Tratamento de Asma" }, 
    { "_id": 9, "paciente_id": 9, "medico_id": 5, "data_internacao": 
    ISODate("2023-04-10"), "data_alta": ISODate("2023-04-15"), "motivo": 
    "Tratamento de Alergia" }, 
    { "_id": 10, "paciente_id": 10, "medico_id": 1, "data_internacao": 
    ISODate("2023-03-20"), "data_alta": ISODate("2023-03-30"), "motivo": 
    "Tratamento Cardíaco" } 
    ]);

   // EXERCÍCIOS

// 1) Calcular a média de idade dos pacientes internados por especialidade médica:
// Utiliza $lookup para unir médicos com internações e, em seguida, pacientes com base nas internações.
// Por fim, agrupa por especialidade médica e calcula a média de idade dos pacientes.
db.medicos.aggregate([
  {
    // Relaciona médicos com internações usando o campo medico_id
    $lookup: {
      from: "internacoes",
      localField: "_id",
      foreignField: "medico_id",
      as: "medico_internacao"
    }
  },
  {
    // Quebra o array de internações em documentos individuais
    $unwind: "$medico_internacao"
  },
  {
    // Relaciona as internações com os pacientes
    $lookup: {
      from: "pacientes",
      localField: "medico_internacao.paciente_id",
      foreignField: "_id",
      as: "med_pac_internacao"
    }
  },
  {
    // Quebra o array de pacientes em documentos únicos
    $unwind: "$med_pac_internacao"
  },
  {
    // Agrupa por especialidade e calcula a média de idade dos pacientes
    $group: {
      _id: "$especialidade",
      media_idade: { $avg: "$med_pac_internacao.idade" }
    }
  },
  {
    // Arredonda a média para duas casas decimais
    $project: {
      _id: 1,
      media_idade: { $round: ["$media_idade", 2] }
    }
  }
])

// 2) Contar o número de internações por paciente:
// Realiza a junção entre internações e pacientes e, em seguida, agrupa por paciente_id contando o total de internações.

db.internacoes.aggregate([
  {
    // Relaciona internações com os dados dos pacientes
    $lookup: {
      from: "pacientes",
      localField: "paciente_id",
      foreignField: "_id",
      as: "internacao_paciente"
    }
  },
  {
    // Quebra o array de pacientes em documentos únicos
    $unwind: "$internacao_paciente"
  },
  {
    // Agrupa por paciente_id e conta quantas internações existem por paciente
    $group: {
      _id: "$paciente_id",
      numero_internacoes: { $sum: 1 }
    }
  },
  {
    // Exibe o ID do paciente e o total de internações
    $project: {
      _id: 1,
      numero_internacoes: 1
    }
  }
])


// 3) Listar os médicos que atenderam pacientes com doenças específicas:
// Une internações com pacientes e, posteriormente, com médicos.
// Filtra os resultados para retornar apenas médicos que atenderam pacientes com a condição especificada.

db.internacoes.aggregate([
  {
    // Relaciona internações com pacientes
    $lookup: {
      from: "pacientes",
      localField: "paciente_id",
      foreignField: "_id",
      as: "paciente_internacoes"
    }
  },
  {
    $unwind: "$paciente_internacoes"
  },
  {
    // Relaciona internações com médicos
    $lookup: {
      from: "medicos",
      localField: "medico_id",
      foreignField: "_id",
      as: "med_internacoes"
    }
  },
  {
    $unwind: "$med_internacoes"
  },
  {
    // Filtra apenas os pacientes com diagnóstico de "Hipertensão"
    $match: {
      "paciente_internacoes.diagnóstico": "Hipertensão"
    }
  }
]).pretty()


// 4) Calcular a duração total de internação por paciente:
// Une pacientes com internações, calcula a diferença entre data de alta e de internação,
// agrupa os resultados por paciente e converte a duração total para dias.
db.pacientes.aggregate([
  {
    // Relaciona pacientes com suas internações
    $lookup: {
      from: "internacoes",
      localField: "_id",
      foreignField: "paciente_id",
      as: "internacoes_pacientes"
    }
  },
  {
    // Transforma o array de internações em documentos individuais
    $unwind: "$internacoes_pacientes"
  },
  {
    // Calcula a duração de cada internação (em milissegundos)
    $project: {
      nome: 1,
      duracao_internacao: {
        $subtract: [
          "$internacoes_pacientes.data_alta",
          "$internacoes_pacientes.data_internacao"
        ]
      }
    }
  },
  {
    // Soma o tempo total de internações por paciente
    $group: {
      _id: "$nome",
      duracao: { $sum: "$duracao_internacao" }
    }
  },
  {
    // Converte de milissegundos para dias
    $project: {
      nome: "$_id",
      duracao_dias: {
        $divide: ["$duracao", 1000 * 60 * 60 * 24]
      },
      _id: 0
    }
  }
])

// 5) Obter a média salarial dos médicos por especialidade:
// Agrupa os médicos por especialidade e calcula a média dos salários,
// arredondando o valor final para duas casas decimais.
db.medicos.aggregate([
  {
    // Agrupa os médicos por especialidade e calcula a média salarial
    $group: {
      _id: "$especialidade",
      media_salario: { $avg: "$salário" }
    }
  },
  {
    // Arredonda a média salarial para duas casas decimais e exibe a especialidade
    $project: {
      especialidade: "$_id",
      media_salario: { $round: ["$media_salario", 2] },
      _id: 0
    }
  }
])

