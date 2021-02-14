const models = require("../models");

const CharacterService = {
	async createCharacter(data) {
		return models.characters.create(data);
	},
};

module.exports = CharacterService;
