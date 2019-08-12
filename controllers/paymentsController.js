const stripe = require("stripe")("sk_test_7eXVixhBDdgwXyRA50MrY8yk00akjFbrDL");

function paymentsController() {
  async function charge(req, res) {
    try {
      let { status } = await stripe.charges.create({
        amount: 2000,
        currency: "usd",
        description: "An example charge",
        source: req.body.token
      });

      res.json({ status });
    } catch (err) {
      res.status(500).send(err);
    }
  }
  return { charge };
}

module.exports = paymentsController;
