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

const characters = [
	{
		firstName: "test",
		lastName: "character",
		status: "ACTIVE",
		stateOfOrigin: "test",
		gender: "MALE",
	},
	{
		firstName: "seed",
		lastName: "two",
		status: "UNKNOWN",
		stateOfOrigin: "test",
		gender: "FEMALE",
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

const seedLocations = async () => {
	try {
		await models.locations.destroy({
			where: {},
			cascade: true,
		});

		const l = await models.locations.create({
			name: "test seed",
			latitude: "2.987603",
			longitude: "2.987603",
		});
		console.log(l, "LLLLLLLLLLLLL");
		characters[0].locationId = l.dataValues.id;
	} catch (error) {
		console.log("Location SEEDING", error);
	}
};

const seedCharacters = async () => {
	try {
		await models.characters.destroy({
			where: {},
			cascade: true,
		});

		await models.characters.create(characters[0]);
		await models.characters.create(characters[1]);
	} catch (error) {
		console.log("Characters SEEDING", error);
	}
};

module.exports = { users, seedUsers, seedLocations, seedCharacters };
