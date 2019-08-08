function vendorsController(Vendor) {
  function insert(req, res) {
    const vendor = new Vendor(req.body);

    vendor
      .save()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Vendor."
        });
      });
  }

  function getAll(req, res) {
    Vendor.find()
      .then(vendors => {
        let vendorsInfo = [];

        vendors.forEach(function(vendorItem) {
          const info = {
            _id: vendorItem._id,
            ...vendorItem.vendorInformation,
            ...vendorItem.vendorProfile
          };

          vendorsInfo.push(info);
        });
        res.send(vendorsInfo);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message ||
            "Some error occurred while retrieving list of vendors."
        });
      });
  }

  function get(req, res) {
    Vendor.findById(req.params.vendorId)
      .then(vendor => {
        if (!vendor) {
          return res.status(404).send({
            message: "Vendor not found."
          });
        }
        const vendorInfo = {
          _id: vendor._id,
          ...vendor.vendorInformation,
          ...vendor.vendorProfile
        };
        res.send(vendorInfo);
      })
      .catch(err => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "Vendor not found."
          });
        }
        return res.status(500).send({
          message: "Error retrieving vendor."
        });
      });
  }

  function update(req, res) {
    //Validate request here
    // if (!req.body.content) {
    //   return res.status(400).send({
    //     message: "User content cannot be empty"
    //   });
    // }

    Vendor.findByIdAndUpdate(req.params.vendorId, req.body, { new: true })
      .then(vendor => {
        if (!vendor) {
          res.status(404).send({
            message: "Vendor not found with id " + req.params.vendorId
          });
        }
        const vendorInfo = {
          _id: vendor._id,
          ...vendor.vendorInformation,
          ...vendor.vendorProfile
        };
        res.send(vendorInfo);
      })
      .catch(err => {
        if (err.kind === "ObjectId") {
          return res.status(400).send({
            message: "Vendor not found with id " + req.params.vendorId
          });
        }

        return res.status(500).send({
          message:
            err.message ||
            "Could not update vendor with id " + req.params.vendorId
        });
      });
  }

  function remove(req, res) {
    Vendor.findByIdAndRemove(req.params.vendorId)
      .then(vendor => {
        if (!vendor) {
          return res.status(400).send({
            message: "Vendor not found with id " + req.params.vendorId
          });
        }
        res.send({ message: "Vendor deleted successfully!" });
      })
      .catch(err => {
        if (err.kind === "ObjectId" || err.name === "NotFound") {
          return res.status(400).send({
            message: "Vendor not vendor with id " + req.params.vendorId
          });
        }

        return res.status(500).send({
          message: "Could not delete vendor with id " + req.params.vendorId
        });
      });
  }

  return { insert, getAll, get, update, remove };
}

module.exports = vendorsController;
