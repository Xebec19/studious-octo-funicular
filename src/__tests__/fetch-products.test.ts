import request from "supertest";
import app from "../app";

test("Products should be fetched with specifying limits", async () => {
  const response = await request(app).get("/public/fetchProducts").query({'limit':'3'});
  expect(response.body.data).toHaveLength(3);
  expect(response.body.status).toBeTruthy();
  expect(response.statusCode).toBe(201);
});

test("Products should be not fetched without specifying limits", async () => {
    const response = await request(app).get("/public/fetchProducts").query({'limit':''});
    expect(response.body.status).toBeFalsy();
    expect(response.statusCode).not.toBe(201);
  });

