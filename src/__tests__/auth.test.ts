import request from "supertest";
import app from "../app";

test("User with correct credentials should be able to login", async () => {
  const payload = {
    email: "rohan@gmail.com",
    password: "password123",
  };
  const response = await request(app).post("/public/login").send(payload);
  expect(response.body.data).toBeTruthy();
  expect(response.statusCode).toBe(201);
});

test("User with in incorrect credentials should not be able to login", async () => {
    const payload = {
        email: "rohan@gmail.com",
        password: "password",
      };
    const response = await request(app).post("/public/login").send(payload);
    expect(response.body.data).toBeFalsy();
    expect(response.statusCode).not.toBe(201);
})