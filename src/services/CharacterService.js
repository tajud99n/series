const models = require("../models");

const CharacterService = {
	async createCharacter(data) {
		return models.characters.create(data);
	},

	async findCharacterById(id) {
		return models.characters.findByPk(id);
	},

	async getAllCharacters(filter, sort, query) {
		return models.characters.findAndCountAll({
			where: query.where,
			offset: filter.offSet,
			limit: filter.limit,
			order: [[`${sort.value}`, `${sort.order}`]],
		});
	}
};

module.exports = CharacterService;
