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

  // xdescribe("GET /api/rides/:id", () => {

  //   it("Should respond to the GET method", async () => {
  //     const insertResponse = await request(app)
  //                             .post("/api/rides")
  //                             .send({ ride: testRide })
  //                             .set({
  //                               'Authorization': 'Bearer ' + jwt,
  //                               'Content-Type': 'application/json'
  //                             });

  //     const { id } = insertResponse.body.ride;
  //     const response = await request(app).get(`/api/rides/${id}`);
  //     expect(response.status).to.eql(200);
  //     expect(response.body).to.have.keys(
  //       'title', 'type', 'metadata',
  //       'ratings', 'intervals', 'timeInSeconds', 'id'
  //     );
  //   });

  //   it("Should increment ride count", async () => {
  //     const oldRows = await query(getRides);
  //     const oldCount = oldRows.length;

  //     const rows = await query(insertRide, [
  //       testRide.type,
  //       testRide.title,
  //       testRide.metadata.rideCount,
  //       testRide.ratings.likes,
  //       testRide.ratings.total,
  //       testRide.timeInSeconds,
  //       JSON.stringify(testRide.intervals)
  //     ]);

  //     const id = rows[0].id;

  //     const { body: oldRide } = await request(app).get(`/api/rides/${id}`);
  //     expect(oldRide.metadata.rideCount).to.eql(0)

  //     await request(app).post(`/api/rides/${id}/ride-count`);

  //     const { body: newRide } = await request(app).get(`/api/rides/${id}`);
  //     expect(newRide.metadata.rideCount).to.eql(1)
  //   });
  // })
})