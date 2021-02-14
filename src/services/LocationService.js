const models = require("../models");

const LocationService = {
	async createLocation(data) {
		return models.locations.create(data);
	},
};

module.exports = LocationService;
