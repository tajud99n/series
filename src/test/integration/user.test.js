const expect = require("expect");
const request = require("supertest");
const { app } = require("./../../app");
const { users, seedUsers } = require("../seeds/seed");

describe("User", () => {
	beforeEach(async function () {
		await seedUsers();
	});
	describe("Create User", () => {
		it("should register and return a new user", (done) => {
			const user = {
				name: "Giwa Tajudeen",
				email: "dev@mail.com",
				password: "password",
			};
			request(app)
				.post("/api/v1/user")
				.send(user)
				.expect(201)
				.expect((res) => {
					expect(res.body.data.user).toHaveProperty("name");
					expect(res.body.data.user).toHaveProperty("email");
					expect(res.body.data).toHaveProperty("token");
				})
				.end(done);
		});
		it("should return a 400 if required fields are missing", (done) => {
			request(app).post("/api/v1/user").send({}).expect(400).end(done);
		});
		it("should not create user if email in use", (done) => {
			request(app)
				.post("/api/v1/user")
				.send({ email: users[0].email, password: "password1" })
				.expect(400)
				.end(done);
		});
	});
});
