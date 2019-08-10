const jwt = require("jsonwebtoken");

module.exports = {
  validateToken: (req, res, next) => {
    const authorizationHeaader = req.headers.authorization;
    let result;
    if (authorizationHeaader) {
      const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
      const options = {
        expiresIn: "24h",
        issuer: "admin"
      };
      try {
        // verify makes sure that the token hasn't expired and has been issued by us
        result = jwt.verify(token, "aoisjda98u12i31hajskdk", options);

        // Let's pass back the decoded token to the request object
        req.decoded = result;
        // We call next to pass execution to the subsequent middleware
        next();
      } catch (err) {
        result = {
          error: `Authentication error. Token invalid.`
        };
        res.status(401).send(result);
      }
    } else {
      result = {
        error: `Authentication error. Token required.`
      };
      res.status(401).send(result);
    }
  }
};
