function authController(User) {
  function login(req, res) {
    const { email, password } = req.body;

    console.log("email: " + email);
    console.log("password: " + password);
    User.findOne({
      "accountDetails.email": email,
      "accountDetails.password": password
    })
      .then(user => {
        if (!user) {
          res.status(404).send({
            message: "User not found"
          });
        }
        res.status(200).send(user);
      })
      .catch(err => {
        if (err) {
          return res.status(400).send({
            message: err.message
          });
        }

        return res.send(user);
      });
    //   function(err, user) {

    //   }
    // );
  }

  function logout(req, res) {}

  return { login };
}

module.exports = authController;
