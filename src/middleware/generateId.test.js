const { v4: uuidv4, validate } = require("uuid");
const generateUniqueId = require("./generateId");
const express = require("express");
const request = require("supertest");

describe("genenrateUniqueId Middleware", () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(generateUniqueId); // use middleware
    app.get("/", (req, res) => {
      res.status(200).send({ id: req.id }); // send ID to the response
    });
  });

  it("should generate unique ID and attach to req", async () => {
    const res = await request(app).get("/");

    // ensure response contains valid UUID using uuid.validate
    expect(res.status).toBe(200);
    expect(validate(res.body.id)).toBe(true);
  });
});
