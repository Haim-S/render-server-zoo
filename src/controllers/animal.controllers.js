
const Animal = require("../models/animal.model");

exports.getAll = async (req, res) => {
    try {
        const animal = await Animal.find();
        res.status(200).json({
            success: true,
            data: animal
        })
    } catch (error) {
        res.status(400).send(error)
    }
};


exports.createAnimal = async (req, res) => {
    try {
        await Animal.create(req.body);
      
        res.status(201).json({
            success: true,
            data: await Animal.find()
        })
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.updateAnimal = async (req, res) =>{
    try {
        await Animal.findByIdAndUpdate(req.params.id, req.body, {
            returnDocument: "after",
        });

        res.status(200).json({
            success: true,
            data: await Animal.find()
        });
    } catch (error) {
        res.status(400).send(error);
    }
}


exports.deleteAnimal = async (req, res) =>{
    try {
        await Animal.deleteOne({_id: req.params.id})
        res.status(200).json({
            success: true,
            data: await Animal.find()
        })
    } catch (error) {
        res.status(400).send(error);
    }
}
