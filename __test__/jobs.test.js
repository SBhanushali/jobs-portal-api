const createServer = require("../server");
const supertest = require("supertest");

const app = createServer();

test("GET /", async (done) => {
  const response = await supertest(app).get("/");

  expect(response.status).toBe(200);
  //   expect(response.body.success).toBeTrue();
  done();
});
// describe("Test by sending only country in location", () => {
//   jest.setTimeout(10000);

//   test("GET by location", async () => {
//     const response = await supertest(app)
//       .get("/jobs")
//       .query({ location: "country=India" })
//       .expect(200);
//   });
// });
