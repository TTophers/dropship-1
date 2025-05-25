// api/create-checkout-session.js

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    // Only accept POST requests here
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB'], // countries you want to ship to
      },
      phone_number_collection: {
        enabled: true, // collect phone numbers
      },
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Security Dragon Leash', // your product name
            },
            unit_amount: 999, // price in cents = $9.99
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/showcase.html`,
      cancel_url: `${req.headers.origin}/showcase.html`,
    });

    // Send the session ID back to frontend
    res.status(200).json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error("Stripe session error:", error);
  }
};
