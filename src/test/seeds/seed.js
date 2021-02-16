const models = require("../../models");
const { hashPassword } = require("../../utils/utils");

const users = [
	{
		name: "john doe",
		email: "john@doe.com",
		password: "",
	},
	{
		name: "jane doe",
		email: "jane@doe.com",
		password: "",
	},
];

const seedUsers = async () => {
	try {
		await models.users.destroy({
			truncate: true,
		});
		const hashedPassword = await hashPassword("password");
		users[0].password = hashedPassword;
		users[1].password = hashedPassword;

		const u1 = await models.users.create(users[0]);
		const u2 = await models.users.create(users[1]);
	} catch (error) {
		console.log("USER SEEDING", error);
	}
};



module.exports = { users, seedUsers  };
