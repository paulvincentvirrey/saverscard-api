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
        const userInfo = {
          _id: user._id,
          username: user.accountDetails.username,
          email: user.accountDetails.email,
          dateModified: user.dateModified,
          dateCreated: user.dateCreated,
          status: user.status,
          isAdmin: user.isAdmin,
          ...user.userProfile
        };

        res.send(userInfo);
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
