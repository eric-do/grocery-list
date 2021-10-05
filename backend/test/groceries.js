const { expect } = require('chai');
let request = require('supertest');
const app = require('../server/app');
const { query } = require('../db/index')
const { testGrocery } = require('./data');
const { deleteGrocery } = require('./sqlQueries');

describe('Groceries', () => {

  afterEach(() => {
    return query(deleteGrocery, [testGrocery.item]);
  })

  describe("POST /api/groceries", () => {

    it("should successfully add grocery", async () => {
      const response = await request(app)
                              .post("/api/groceries")
                              .send(testGrocery)
                              .set({ 'Content-Type': 'application/json' });

      expect(response.status).to.eql(201);
      expect(response.body).to.have.keys('id');
    });
  })

  describe("GET /api/groceries", () => {
    it("Should respond to the GET method", async () => {
      await request(app)
        .post("/api/groceries")
        .send(testGrocery)
        .set({ 'Content-Type': 'application/json' });

      const response = await request(app).get("/api/groceries");
      expect(response.status).to.eql(200);
      expect(response.body).to.be.an.instanceOf(Array)
      expect(response.body[0]).to.have.keys('id', 'item', 'quantity');
    });
  })

  describe("POST /api/groceries/seed", () => {
    it("Should reset DB to original state", async () => {
      await request(app)
        .post("/api/groceries")
        .send(testGrocery)
        .set({ 'Content-Type': 'application/json' });

      await request(app).post("/api/groceries/seed");

      const response = await request(app).get("/api/groceries");
      expect(response.status).to.eql(200);
      expect(response.body).to.be.an.instanceOf(Array)
      expect(response.body.length).to.eql(2);
    });
  })
})