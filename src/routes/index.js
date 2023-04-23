const router = require("express").Router();
const {authJwtToken} = require("../middlewares/authentication.middleware");

const authRoutes = require("./auth.routes");
const animalsRoutes = require("./animals.routes");


router.use("/auth", authRoutes);
router.use("/animal",authJwtToken, animalsRoutes);

router.all("*", (req, res, next) => {
    res.status(404).send({error: "not found"});
})

module.exports = router;