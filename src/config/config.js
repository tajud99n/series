require("dotenv").config();
const appName = "shapes";

module.exports = {
	appName: appName,
	environment: process.env.NODE_ENV,
	port: process.env.PORT,
	development: {
		url: process.env.DATABASE_URL,
		dialect: "postgres",
	},
	test: {
		url: process.env.DATABASE_URL,
		dialect: "postgres",
	},
	production: {
		url: process.env.DATABASE_URL,
		dialect: "postgres",
	},
};
