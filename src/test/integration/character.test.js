const expect = require("expect");
const request = require("supertest");
const { app } = require("./../../app");
const { users, seedUsers, locations, seedLocations } = require("../helpers/seed");
const { loginUser } = require("../helpers/helper");

describe("Character", () => {
	let loggedInUser;

	beforeEach(async function () {
		await seedUsers();
		loggedInUser = await loginUser(users[0].email, "password");
	});
	describe("Create Character", () => {
		it("should return a 401 if no token", (done) => {
			request(app).post("/api/v1/character").send({}).expect(401).end(done);
		});
		it("should return a 400 if required fields are missing", (done) => {
			request(app)
				.post("/api/v1/character")
				.set("Authorization", `bearer ${loggedInUser.body.data.token}`)
				.send({})
				.expect(400)
				.end(done);
		});
        it("should create a new character", (done) => {
			request(app)
				.post("/api/v1/character")
				.set("Authorization", `bearer ${loggedInUser.body.data.token}`)
				.send({
					firstName: "test",
					lastName: "character",
					status: "ACTIVE",
                    stateOfOrigin: "test",
                    gender: "MALE"
				})
                .expect((res) => {
                    console.log(res.body.data);
					expect(res.body.data.character).toHaveProperty("firstName");
					expect(res.body.data.character).toHaveProperty("lastName");
					expect(res.body.data.character).toHaveProperty("status");
					expect(res.body.data.character).toHaveProperty("gender");
				})
				.expect(201)
				.end(done);
		});
	});
});
