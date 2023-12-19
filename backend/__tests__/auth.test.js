const request = require("supertest");
const app = require("../app.js");

/**
 *
 * @param {*} tokenCookie string with token's substring
 * @returns token string
 */
const get_token = (tokenCookie) => {
  const tokenRegex = /token=([^;]+)/;
  const match = tokenCookie.match(tokenRegex);
  // Check if there is a match and extract the token
  const token = match ? match[1] : null;
  return token;
};

beforeAll(() => {
  const token = null;
});

afterAll(async () => {
  const res = await request(app)
    .delete("/api/user/delete_user")
    .set("Cookie", "token=" + token)
    .send({
      email: "testregister@gmail.com",
    });
});

describe("/auth/register", () => {
  describe("given a correct parameters for register", () => {
    test("should respond with 200 status code", async () => {
      const res = await request(app).post("/api/auth/register").send({
        email: "testregister@gmail.com",
        password: "testregister",
        first_name: "testregister",
        last_name: "testregister",
      });
      expect(res.statusCode).toBe(200);
    });
  });

  describe("missing email parameter", () => {
    test("should respond with 422 status code", async () => {
      const res = await request(app).post("/api/auth/register").send({
        password: "testregister",
        first_name: "testregister",
        last_name: "testregister",
      });
      expect(res.statusCode).toBe(422);
    });
  });

  describe("wrong email format", () => {
    test("should respond with 422 status code", async () => {
      const res = await request(app).post("/api/auth/register").send({
        email: "testregister",
        password: "testregister",
        first_name: "testregister",
        last_name: "testregister",
      });
      expect(res.statusCode).toBe(422);
    });
  });

  describe("missing password parameter", () => {
    test("should respond with 422 status code", async () => {
      const res = await request(app).post("/api/auth/register").send({
        email: "testregister@gmail.com",
        first_name: "testregister",
        last_name: "testregister",
      });
      expect(res.statusCode).toBe(422);
    });
  });

  describe("missing first_name parameter", () => {
    test("should respond with 422 status code", async () => {
      const res = await request(app).post("/api/auth/register").send({
        email: "testregister@gmail.com",
        password: "testregister",
        last_name: "testregister",
      });
      expect(res.statusCode).toBe(422);
    });
  });

  describe("missing last_name parameter", () => {
    test("should respond with 422 status code", async () => {
      const res = await request(app).post("/api/auth/register").send({
        email: "testregister@gmail.com",
        password: "testregister",
        first_name: "testregister",
      });
      expect(res.statusCode).toBe(422);
    });
  });
});

describe("/auth/login", () => {
  describe("given a correct email and password", () => {
    test("should respond with 200 status code", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "testregister@gmail.com",
        password: "testregister",
      });
      token = get_token(res.header["set-cookie"][0]);
      expect(res.statusCode).toBe(200);
    });
  });

  describe("given a incorrect email", () => {
    test("should respond with 404 status code", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "emailNotExist@gmail.com",
        password: "testregister",
      });
      expect(res.statusCode).toBe(404);
    });
  });

  describe("given a incorrect password", () => {
    test("should respond with 404 status code", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "testregister@gmail.com",
        password: "wrongPassword",
      });
      expect(res.statusCode).toBe(404);
    });
  });

  describe("given no email", () => {
    test("should respond with 404 status code", async () => {
      const res = await request(app).post("/api/auth/login").send({
        password: "testregister",
      });
      expect(res.statusCode).toBe(422);
    });
  });

  describe("given no password", () => {
    test("should respond with 404 status code", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "testregister@gmail.com",
      });
      expect(res.statusCode).toBe(422);
    });
  });
});
