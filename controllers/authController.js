const jwt = require("jsonwebtoken");

function authController(User) {
  function login(req, res) {
    const { email, password } = req.body;

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

        // Create a token
        const payload = { user: user.username };
        const options = { expiresIn: "24h", issuer: "admin" };
        const secret = "aoisjda98u12i31hajskdk";
        const token = jwt.sign(payload, secret, options);

        const userInfo = {
          _id: user._id,
          username: user.accountDetails.username,
          email: user.accountDetails.email,
          dateModified: user.dateModified,
          dateCreated: user.dateCreated,
          status: user.status,
          isAdmin: user.isAdmin,
          ...user.userProfile,
          access_token: token
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
