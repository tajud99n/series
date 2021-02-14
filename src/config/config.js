require("dotenv").config();
const appName = "series";

module.exports = {
	appName: appName,
	environment: process.env.NODE_ENV,
	port: process.env.PORT,
	development: {
		url: process.env.DATABASE_URL,
		dialect: "mysql",
	},
	test: {
		url: process.env.DATABASE_URL,
		dialect: "mysql",
	},
	production: {
		url: process.env.DATABASE_URL,
		dialect: "mysql",
	},
	salt: process.env.SALT_ROUND,
	jwt: {
		SECRETKEY: process.env.JWT_SECRET_KEY,
		expires: process.env.JWT_EXPIRY,
		issuer: process.env.ISSUER,
		alg: process.env.JWT_ALG,
	},
};
