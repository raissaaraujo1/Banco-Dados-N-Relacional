db.menu.insertMany([
    {_id: 1, dish: "Pizza", ingredients:["Dough", "Tomato Sauce", "Cheese"], price: 30},
    {_id: 2, dish: "Sushi", ingredients:["Rice", "Fish", "Seaweed"], price: 40},
    {_id: 3, dish: "Taco", ingredients:["Tortilla", "Beef", "Cheese"], price: 15}

]);

//mostrando o cardapio
db.menu.find().pretty()

//o restaurante decidiu aumentar o preço de todos os pratos em 10% Atualize os preços
db.menu.updateOne(
    {dish: "Pizza"},
    { $set: { price: 30 }}
);


db.menu.updateMany(
    {},
    { $mul: { price: 1.1}}
)
//O taco agora vem com guacamole. Adicione esse ingrediente a lista de ingredientes
db.menu.updateOne(
    {dish: "Taco"},
    { $push: { ingredients: "Guacamole"}}
)



//o sushi teve um reajuste e agroa custa 35. Atualize esse valor
db.menu.updateOne(
    {dish: "Sushi"},
    { $set: { price: 35 }}
);

//o restaurante removeu beef dos tacos e substitiu por chicken. Atualize a lista dei ngredientes do taco 
//removendo o elemento beef
db.menu.updateOne(
    {dish: "Taco"},
    { $pull: { ingredients: "Beef" }}
)

//adicionando o elementno chicken
db.menu.updateOne(
    {dish: "Taco"},
    { $addToSet: { ingredients: "chicken" }}
)