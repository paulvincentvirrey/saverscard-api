const jwt = require("jsonwebtoken");

function authController(User, Vendor) {
  function login(req, res) {
    const { email, password, loginAs } = req.body;
    console.log(loginAs);
    if (loginAs === "user") {
      User.findOne({
        email: email,
        password: password
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
            account: user,
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
    } else if (loginAs === "vendor") {
      Vendor.findOne({
        email: email,
        password: password
      })
        .then(vendor => {
          if (!vendor) {
            res.status(404).send({
              message: "Vendor not found"
            });
          }

          // Create a token
          const payload = { user: vendor.username };
          const options = { expiresIn: "24h", issuer: "admin" };
          const secret = "aoisjda98u12i31hajskdk";
          const token = jwt.sign(payload, secret, options);

          const vendorInfo = {
            account: vendor,
            access_token: token
          };

          res.send(vendorInfo);
        })
        .catch(err => {
          if (err) {
            return res.status(400).send({
              message: err.message
            });
          }

          return res.send(vendor);
        });
    } else {
      res.status(404).send();
    }
    //   function(err, user) {

    //   }
    // );
  }

  function logout(req, res) {}

  return { login };
}

module.exports = authController;
