const jwt = require("jsonwebtoken");
const config = require("../config/auth.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!",
            });
        }
        req.userId = decoded.id;
        next();
    });
};

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        const roles = await Role.find({ _id: { $in: user.roles } });
        const isAdmin = roles.some(role => role.name === "admin");

        if (isAdmin) {
            next();
        } else {
            res.status(403).send({ message: "Require Admin Role!" });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const authJwt = {
    verifyToken,
    isAdmin
};

module.exports = authJwt;
