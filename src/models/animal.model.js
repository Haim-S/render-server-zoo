const {Schema, model} = require("mongoose");
const PicRandomAnimals = require("../utils/picRandom");


const animalSchema = new Schema({
    name: {type: String},
    type: {type: String},
    age: {type: Number},
    imgUrl: {type: String, default: PicRandomAnimals}
});


const Animal = model("Animal", animalSchema);

module.exports = Animal;