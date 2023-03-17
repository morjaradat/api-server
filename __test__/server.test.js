const { app } = require("../src/server"); // destructing assignment
const supertest = require("supertest");
const mockRequest = supertest(app);

const { db, Food, Clothes } = require("../src/models/index");

// before any of the test create a connection
beforeAll(async () => {
  await db.sync();
});

describe("Web server", () => {
  // Check if 404 is handled

  it("Should respond with hello world for home route", async () => {
    const response = await mockRequest.get("/");
    expect(response.text).toBe("hello world");
  });
  it("Should respond with 404 status on an bad route", async () => {
    const response = await mockRequest.get("/foo");
    expect(response.status).toBe(404);
  });
  it("Should respond with 404 status on an bad method", async () => {
    const response = await mockRequest.put("/food");
    expect(response.status).toBe(404);
  });
});

describe("food router", () => {
  // test if can create a food`
  it("can add a food", async () => {
    const response = await mockRequest.post("/food").send({
      name: "banana",
      cost: 1.2,
    });
    expect(response.status).toBe(201);
  });

  // test if can read food
  it("can get all food", async () => {
    const response = await mockRequest.get("/food");
    expect(response.status).toBe(200);
  });

  // test if can read one food
  it("can get one food ", async () => {
    const response = await mockRequest.get("/food/1");
    expect(response.status).toBe(200);

    // you can test the body object or any part of it
    // expect(response.body.message).toBe('pass!')
  });

  // test if can update a food
  it("can update a food record", async () => {
    const response = await mockRequest.put("/food/1").send({
      name: "update_banana",
      cost: 2.5,
    });
    expect(response.status).toBe(201);
  });

  // test if can delete a food
  it("can delete a food record", async () => {
    const response = await mockRequest.delete("/food/1");
    expect(response.status).toBe(204);
  });
});

describe("clothes router", () => {
  // test if can create a clothes
  it("can add a clothes", async () => {
    const response = await mockRequest.post("/clothes").send({
      type: "T-shirt",
      color: "blue",
      cost: 9.99,
    });
    expect(response.status).toBe(201);
  });

  // test if can read  clothes
  it("can get all clothes", async () => {
    const response = await mockRequest.get("/clothes");
    expect(response.status).toBe(200);
  });
  // test if can read one clothes
  it("can get one clothes ", async () => {
    const response = await mockRequest.get("/clothes/1");
    expect(response.status).toBe(200);

    // you can test the body object or any part of it
    // expect(response.body.message).toBe('pass!')
  });

  // test if can update a clothes
  it("can update a clothes record", async () => {
    const response = await mockRequest.put("/clothes/1").send({
      type: "T-shirt",
      color: "red",
      cost: 7.99,
    });
    expect(response.status).toBe(201);
  });

  // test if can delete a clothes
  // it("can delete a clothes record", async () => {
  //   const response = await mockRequest.delete("/clothes/1");
  //   expect(response.status).toBe(204);
  // });
});

// after all the tests are done
afterAll(async () => {
  await db.drop(); // drop the database tables
});
