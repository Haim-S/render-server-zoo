const router = require("express").Router();
const animalsController = require("../controllers/animal.controllers");

router.get("/all", animalsController.getAll);
router.post("/create", animalsController.createAnimal);
router.put("/update/:id", animalsController.updateAnimal);
router.delete("/delete/:id", animalsController.deleteAnimal);


module.exports = router;