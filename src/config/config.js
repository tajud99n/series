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
};
