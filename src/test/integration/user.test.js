const expect = require("expect");
const request = require("supertest");
const { app } = require("./../../app");
const { users, seedUsers } = require("../helpers/seed");

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
	describe("Login", () => {
		it("should login user and return auth token", (done) => {
			request(app)
				.post("/api/v1/login")
				.send({
					email: users[0].email,
					password: "password",
				})
				.expect(200)
				.expect((res) => {
					expect(res.body.data).toHaveProperty("token");
				})
				.end(done);
		});
		it("should reject invalid login", (done) => {
			request(app)
				.post("/api/v1/login")
				.send({
					email: users[0].email,
					password: "passwordfake",
				})
				.expect(401)
				.end(done);
		});
	});
});
