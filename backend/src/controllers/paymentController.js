const Stripe =
  require("stripe");

const stripe =
  Stripe(
    process.env
      .STRIPE_SECRET_KEY
  );


// ============================
// CREATE PAYMENT INTENT
// ============================
exports.createPaymentIntent =
  async (req, res) => {

    try {

      const {
        amount
      } = req.body;

      if (!amount) {

        return res.status(400)
          .json({

            success: false,
            message:
              "Amount required"
          });
      }

      const paymentIntent =
        await stripe
          .paymentIntents
          .create({

            amount:
              amount * 100,

            currency:
              "bdt",

            automatic_payment_methods:
            {
              enabled: true
            }
          });

      res.status(200)
        .json({

          success: true,

          clientSecret:
            paymentIntent.client_secret
        });

    } catch (error) {

      console.log(error);

      res.status(500)
        .json({

          success: false,
          message:
            "Payment intent failed"
        });
    }
  };