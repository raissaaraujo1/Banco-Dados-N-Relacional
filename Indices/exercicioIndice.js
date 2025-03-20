// Criando 100 mil usuários
for (let i = 0; i < 100000; i++) {
    db.usuarios.insertOne({
        nome: `Usuarios${i}`,
        email: `usuarios${i}@email.com`,
        idade: Math.floor(Math.random() * 80) + 18
    });
}

// Criando índices para otimizar buscas
db.usuarios.createIndex({email: 1})               // Índice para o campo "email"(Índice simples)
db.usuarios.createIndex({email: 1, idade: -1})   // Índice para o campo "email" e "idade" (Índice Composto)

// Listando os índices criados
db.usuarios.getIndexes()

// Testando buscas com e sem índices
db.usuarios.find({email: "usuarios51522@email.com"}).explain("executionStats")  // MongoDB escolhe o índice
db.usuarios.find({email: "usuarios99562@email.com"}).hint({email: 1, idade: -1}).explain("executionStats")  // Forçando índice específico
