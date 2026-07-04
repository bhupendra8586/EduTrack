const jwt = require("jsonwebtoken");

async function authenticateUser(req, res, next){
    const token = req.cookies?.token;

    if(!token){
        return res.status(400).json({ msg: "Not authorised, no token found" });
    }

    try {
        console.log("TOKEN FOUND: ", token);
        const decode_token = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode_token;
        next();
    } catch (error) {
        res.status(400).send({ message: "authMiddleware error" });
        console.log(error);
    }
}

module.exports = authenticateUser;