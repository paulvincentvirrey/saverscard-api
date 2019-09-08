const stripe = require("stripe")("sk_test_7eXVixhBDdgwXyRA50MrY8yk00akjFbrDL");
const user_plan = "plan_FlwPmsQn894kG9";
const vendor_plan = "plan_FlwQEuaOUm4MRQ";

function paymentsController() {
  async function charge(req, res) {
    let cust = "";
    try {
      cust = await stripe.customers.create({
        email: req.body.email,
        name: req.body.name,
        source: req.body.token
      });
    } catch (err) {
      console.log(err);
    }
    try {
      const current_plan =
        req.body.subscription_type == "user" ? user_plan : vendor_plan;
      let { status } = await stripe.subscriptions.create({
        customer: cust.id,
        items: [
          {
            plan: current_plan
          }
        ]
      });

      res.json({ status });
    } catch (err) {
      res.status(500).send(err);
    }

    //   // let { status } = await stripe.charges.create({
    //   //   amount: 2000,
    //   //   currency: "usd",
    //   //   description: "An example charge",
    //   //   source: req.body.token
    //   // });

    //   res.json({ status });
    // } catch (err) {
    //   res.status(500).send(err);
    // }
  }
  return { charge };
}

module.exports = paymentsController;
