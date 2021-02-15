const models = require("../models");

const LocationService = {
	async createLocation(data) {
		return models.locations.create(data);
	},

	async findLocationById(id) {
		return models.locations.findByPk(id);
	}
};

module.exports = LocationService;
