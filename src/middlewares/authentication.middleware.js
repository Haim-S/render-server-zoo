
const JwtTokenService = require("../services/jwt.service");


const authJwtToken = (req, res, next) => {
    try {
        const token = req.headers["access-token"];
        if(!token) return res.sendStatus(401);
        const decodedToken = JwtTokenService.verifyAccessToken(token);
        req.userId = decodedToken.userId;
        next()
    } catch (error) {
        res.status(403).send(error.message);
    }
}


module.exports = {authJwtToken};