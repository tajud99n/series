const models = require("../models");
const { Op } = require("sequelize");
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
	},

	async searchCharacters(filter, q) {
		return models.characters.findAndCountAll({
			where: {
				[Op.or]: [
					{ firstName: { [Op.like]: "%" + q + "%" } },
					{ lastName: { [Op.like]: "%" + q + "%" } },
				],
			},
			include: [
				{
					model: models.characterEpisodes,
					required: true,
					include: {
						model: models.episodes,
					},
				},
			],
			offset: filter.offSet,
			limit: filter.limit,
		});
	},
};

module.exports = CharacterService;
