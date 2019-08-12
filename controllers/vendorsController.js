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
        res.send(vendors);
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

        res.send(vendor);
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
    //     message: "Vendor content cannot be empty"
    //   });
    // }

    Vendor.findByIdAndUpdate(
      { _id: req.params.vendorId },
      { $set: req.body },
      { new: true }
    )
      .then(vendor => {
        if (!vendor) {
          res.status(404).send({
            message: "Vendor not found with id " + req.params.vendorId
          });
        }

        res.send(vendor);
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

  function updatePassword(req, res) {
    const { vendorId } = req.params;
    const { currentPassword, newPassword } = req.body;
    Vendor.updateOne(
      { _id: vendorId, password: currentPassword },
      { password: newPassword }
    )
      .then(x => {
        if (x.n === 0) {
          res.status(404).send({
            message:
              "Incorrect password for Vendor with id " + req.params.vendorId
          });
        }

        res.send({ message: "Password updated successfully!" });
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
            "Could not update user with id " + req.params.vendorId
        });
      });
  }

  function replace(req, res) {
    //Validate request here
    // if (!req.body.content) {
    //   return res.status(400).send({
    //     message: "Vendor content cannot be empty"
    //   });
    // }

    Vendor.findByIdAndUpdate(req.params.vendorId, req.body, { new: true })
      .then(vendor => {
        if (!vendor) {
          res.status(404).send({
            message: "Vendor not found with id " + req.params.vendorId
          });
        }

        res.send(vendor);
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

  return { insert, getAll, get, replace, update, updatePassword, remove };
}

module.exports = vendorsController;
