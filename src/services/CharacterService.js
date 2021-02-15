const models = require("../models");

const CharacterService = {
	async createCharacter(data) {
		return models.characters.create(data);
	},

	async findCharacterById(id) {
		return models.characters.findByPk(id);
	},
};

module.exports = CharacterService;
