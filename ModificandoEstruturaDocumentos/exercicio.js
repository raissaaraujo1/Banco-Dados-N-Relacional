db.heroes.insertMany([
    { _id: 1, name: "Spider-Man", city: "New York", power: ["Agility", "Web-Shooting"], defeatedVillains: 50},
    { _id: 2, name: "Batman", city: "Gothan", power: ["Martial-Arts", "Detective Skills"], defeatedVillains: 200},
    { _id: 3, name: "Wonder Woman", city: "Themycira", power: ["Super Strength", "Lasso"], defeatedVillains: 170}
    
    
]);

//o homem aranha desenvolveu um novo poder: Sentido Aranha Aprimorado. Adicione esse poder ao array power de "Spider-Man"
db.heroes.updateOne(
    {name: "Spider-Man"},
    { $push: { power: "Sentido Aranha Aprimorado"}}
)


//O bataman prendeu mais 10 vilões. Atualize o campo defeatedVillains para refletir essa mudança
db.heroes.updateOne(
    {name: "Batman"},
    {$inc : {defeatedVillains: 10}}
)

// O nomw sa cidade da mulher maravilha foi alterado para "Amazonia". Atualize essa informação
db.heroes.updateOne(
    {name: "Wonder Woman"},
    { $set: { city: "Amazonia" }}
);

//O batman perdeu suas "Detective Skills" (ele não se lembra mais como investigar). Remova essa habilidade da lista power
db.heroes.updateOne(
    {name: "Batman"},
    { $pull: { power: "Detective Skills" }}
)