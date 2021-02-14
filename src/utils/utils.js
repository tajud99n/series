const config = require("../config/config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const validateRequest = async (data, validationSchema) => {
    const errors = validationSchema.validate(data);

    if (errors.error) {
        return errors.error.details[0].message;
    }
};

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(Number(config.salt));
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

const createToken = async (data) => {
    const token = jwt.sign(data, config.jwt.SECRETKEY, {
        subject: config.appName,
        algorithm: config.jwt.alg,
        expiresIn: config.jwt.expires,
        issuer: config.jwt.issuer,
    });
    return token;
};

module.exports = { validateRequest, hashPassword, createToken  };