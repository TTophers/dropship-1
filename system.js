const buyBtn = document.getElementById('buy-button');

buyBtn.addEventListener('click', async () => {
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
  });

  const data = await response.json();

  if (data.id) {
    const stripe = Stripe('pk_live_51RSMV1080yAp4Owf1zQ4X1KNq33Q012q1vE5XiPGzFlcTFoBLxvFtoWNW5aqDgaT5G93GCuEbe2EBO4Zrl8YDdJC00WITxUasy'); // Use pk_live_ or pk_test_
    stripe.redirectToCheckout({ sessionId: data.id });
  } else {
    alert('Failed to create checkout session');
    console.error(data.error);
  }
});