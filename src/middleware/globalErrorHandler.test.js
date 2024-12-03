const express = require("express");
const request = require("supertest");
const app = require("../app");
const globalErrorHandler = require("./globalErrorHandler");

describe("Global Error Handler", () => {
  it("Should handle 404 errors from /:id/points route", async () => {
    const res = await request(app).get("/receipts/invalid123/points");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "No receipt found for that id" });
  });
});
