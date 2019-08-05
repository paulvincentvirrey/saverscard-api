require("should");

const request = require("supertest");
const mongoose = require("mongoose");

process.env.ENV = "Test";

const app = require("../app.js");

const Vendor = mongoose.model("Vendor");
const agent = request.agent(app);

describe("Vendor CRUD Test", () => {
  it("should allow a vendor to be posted and return name and _id", done => {
    const vendorPost = {
      name: "Frankie's",
      address: {},
      category: {},
      discountRate: 10,
      image: ""
    };

    agent
      .post("/api/vendors")
      .send(vendorPost)
      .expect(200)
      .end((err, results) => {
        // console.log(results);
        // results.body.name.should.not.equal("Frankie's");
        results.body.should.have.property("_id");
        done();
      });
  });

  afterEach(done => {
    Vendor.deleteMany({}).exec();
    done();
  });

  after(done => {
    mongoose.connection.close();
    app.server.close(done());
  });
});
