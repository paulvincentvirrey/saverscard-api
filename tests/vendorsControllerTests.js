const should = require("should");
const sinon = require("sinon");
const vendorController = require("../controllers/vendorsController");

describe("Vendor Controller Tests:", () => {
  describe("Post", () => {
    it("should not allow an empty name on post", () => {
      const Vendor = function(vendor) {
        this.save = () => {};
      };

      const req = {
        body: {
          discountRate: 10
        }
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy()
      };

      const controller = vendorController(Vendor);
      controller.post(req, res);

      res.status
        .calledWith(400)
        .should.equal(true, `Bad Status ${res.status.args[0][0]}`);

      res.send.calledWith("Name is required").should.equal(true);
    });
  });
});
