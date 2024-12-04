const request = require("supertest");
const app = require("../app");
const globalErrorHandler = require("./globalErrorHandler");

describe("Global Error Handler", () => {
  beforeAll(() => {
    // Example route to simulate an error
    app.get("/receipts/process", (req, res, next) => {
      const error = new Error("Something went wrong");
      error.status = 500;
      next(error);
    });

    app.use(globalErrorHandler);
  });

  it("should handle 404 errors with a custom message", async () => {
    const res = await request(app).get("/receipts/invalid123/points");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "No receipt found for that id" });
  });

  it("should handle missing status or details and default to 500", async () => {
    const res = await request(app).get("/receipts/process").send();
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: "Internal Server Error" });
  });
});
