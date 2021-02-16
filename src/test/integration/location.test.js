const expect = require("expect");
const request = require("supertest");
const { app } = require("./../../app");
const { users, seedUsers } = require("../helpers/seed");
const { loginUser } = require("../helpers/helper");

describe("Location", () => {
	let loggedInUser;

	beforeEach(async function () {
		await seedUsers();
		loggedInUser = await loginUser(users[0].email, "password");
	});
	describe("Create Location", () => {
		it("should return a 401 if no token", (done) => {
			request(app)
				.post("/api/v1/location")
				.send({})
				.expect(401)
				.end(done);
		});
		it("should return a 400 if required fields are missing", (done) => {
			request(app)
				.post("/api/v1/location")
				.set("Authorization", `bearer ${loggedInUser.body.data.token}`)
				.send({})
				.expect(400)
				.end(done);
		});
		it("should create a new location", (done) => {
			request(app)
				.post("/api/v1/location")
				.set("Authorization", `bearer ${loggedInUser.body.data.token}`)
				.send({
                    name: "test",
                    latitude: "2.987603",
                    longitude: "2.987603"
				})
				.expect((res) => {
					expect(res.body.data.location).toHaveProperty("name");
					expect(res.body.data.location).toHaveProperty("latitude");
					expect(res.body.data.location).toHaveProperty("longitude");
					expect(res.body.data.location).toHaveProperty("created");
				})
				.expect(201)
				.end(done);
		});
	});
});
