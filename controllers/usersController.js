function usersController(User) {
  function insert(req, res) {
    const user = new User(req.body);

    user
      .save()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the User."
        });
      });
  }

  function getAll(req, res) {
    User.find()
      .then(users => {
        res.send(users);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving list of users."
        });
      });
  }

  function get(req, res) {
    User.findById(req.params.userId)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: "User not found."
          });
        }
        res.send(user);
      })
      .catch(err => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "User not found."
          });
        }
        return res.status(500).send({
          message: "Error retrieving user."
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

    User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
      .then(user => {
        if (!user) {
          res.status(404).send({
            message: "User not found with id " + req.params.userId
          });
        }
        res.send(user);
      })
      .catch(err => {
        if (err.kind === "ObjectId") {
          return res.status(400).send({
            message: "User not found with id " + req.params.userId
          });
        }

        return res.status(500).send({
          message:
            err.message || "Could not update user with id " + req.params.userId
        });
      });
  }

  function remove(req, res) {
    User.findByIdAndRemove(req.params.userId)
      .then(user => {
        if (!user) {
          return res.status(400).send({
            message: "User not found with id " + req.params.userId
          });
        }
        res.send({ message: "User deleted successfully!" });
      })
      .catch(err => {
        if (err.kind === "ObjectId" || err.name === "NotFound") {
          return res.status(400).send({
            message: "User not found with id " + req.params.userId
          });
        }

        return res.status(500).send({
          message: "Could not delete user with id " + req.params.userId
        });
      });
  }

  return { insert, getAll, get, update, remove };
}

module.exports = usersController;
