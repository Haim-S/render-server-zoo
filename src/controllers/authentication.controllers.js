const User = require("../models/user.model");
const JwtTokenService = require("../services/jwt.service");




exports.login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        
        if(!user) return res.status(404).send({ ok: false, message: "Not found" });
        const isPasswordMatch = await user.comparePassword(password);
       
        if(!isPasswordMatch) return res.status(403).send({ ok: false, message: "The password is incorrect" });
        const accessToken = JwtTokenService.createAccessToken(user._id);
        const refreshToken = JwtTokenService.createRefreshToken(user._id);
        user.setJwtTokens(accessToken, refreshToken);
        const userWithoutPassword = { ...user._doc };
        delete userWithoutPassword.password;
        // const userWithoutPassword = await User.updateOne(user, {password: undefined})
        res.send(userWithoutPassword);
    } catch (error) {
        res.status(500).send(error.message);
    }
} 


exports.register = async (req, res, next) => {
    await User.create(req.body);
    const {email} = req.body;
    const user = await User.findOne({email});

    const values = [...req.body, 
        {jwt_ac_token: JwtTokenService.createAccessToken(user._id),
        jwt_rf_token: JwtTokenService.createRefreshToken(user._id),
        }
    ]

    try {
        await User.create(values);
        return res.status(200).send(user.jwt_ac_token);
    } catch (error) {
        res.send(error.message);
    }

}


exports.logout = async (req, res, next) => {
    try {
        const { token } = req.body;
        const user = await User.findOne({ jwt_ac_token: token});
        if(!user) return res.status(404).send("not found your key");
        await User.updateOne(user, {jwt_ac_token: undefined});
        res.send({ok: true, message: "You have been logged out"}); 
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.isLogin = async (req, res, next) => {
    try {
        const token = req.query.ac_token || req.body.ac_token;
        if(!token) return  res.status(403).send({ ok: false, message: "Token is required" });
        const decoded = JwtTokenService.verifyAccessToken(token);
        const {userId} = decoded;
        const user = await User.findById(userId);
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
}